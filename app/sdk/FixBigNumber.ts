import { BigNumber } from "bignumber.js";
import invariant from "tiny-invariant";
import { BigintIsh } from "../types/BigIntIsh";
import { maxUint256 } from "viem";



BigNumber.set({ DECIMAL_PLACES: 18, ROUNDING_MODE: 1, EXPONENTIAL_AT: 60 });

export class FixBigNumber {
  public readonly number: BigNumber;

  public readonly decimals: number;

  public readonly decimalScale: BigNumber;

  public static fromWei(weiAmount: BigintIsh, decimals?: number) {
    if (weiAmount.toString() === "0") {
      return new FixBigNumber(0, decimals, false);
    }

    return new FixBigNumber(weiAmount, decimals, true);
  }

  public static toWei(amount: BigintIsh, decimals?: number) {
    return new FixBigNumber(amount, decimals, false);
  }

  constructor(amount: BigintIsh, decimals = 18, isWei = false) {
    this.decimals = decimals;
    this.decimalScale = new BigNumber(10).pow(decimals);
    const value = isWei
      ? new BigNumber(amount)
      : new BigNumber(amount).multipliedBy(this.decimalScale);

    invariant(value.lte(maxUint256), "AMOUNT");
    this.number = value;
  }

  public add(other: BigintIsh | FixBigNumber): FixBigNumber {
    let added: BigNumber;

    if (other instanceof FixBigNumber) {
      added = this.number.plus(
        new BigNumber(other.toExact()).multipliedBy(this.decimalScale),
      );
    } else {
      added = this.number.plus(
        new BigNumber(other).multipliedBy(this.decimalScale),
      );
    }

    return new FixBigNumber(added, this.decimals, true);
  }

  public subtract(other: BigintIsh | FixBigNumber): FixBigNumber {
    let subtracted: BigNumber;

    if (other instanceof FixBigNumber) {
      subtracted = this.number.minus(
        new BigNumber(other.toExact()).multipliedBy(this.decimalScale),
      );
    } else {
      subtracted = this.number.minus(
        new BigNumber(other).multipliedBy(this.decimalScale),
      );
    }

    return new FixBigNumber(subtracted, this.decimals, true);
  }

  public divide(other: BigintIsh | FixBigNumber): FixBigNumber {
    let divided: BigNumber;

    if (other instanceof FixBigNumber) {
      divided = this.number.div(other.toExact());
    } else {
      divided = this.number.div(new BigNumber(other));
    }

    return new FixBigNumber(divided, this.decimals, true);
  }

  public multiply(other: BigintIsh | FixBigNumber): FixBigNumber {
    let multiplied: BigNumber;

    if (other instanceof FixBigNumber) {
      multiplied = this.number.multipliedBy(other.toExact());
    } else {
      multiplied = this.number.multipliedBy(new BigNumber(other));
    }

    return new FixBigNumber(multiplied, this.decimals, true);
  }

  public toExact(decimals?: number, rounding?: BigNumber.RoundingMode): string {
    if (decimals)
      return this.number.div(this.decimalScale).toFixed(decimals, rounding);

    return this.number.div(this.decimalScale).toFixed();
  }

  public toFixed(
    decimals?: number,
    rounding: BigNumber.RoundingMode = 1,
  ): string {
    if (!decimals) return this.toExact();

    return this.number
      .div(this.decimalScale)
      .decimalPlaces(decimals, rounding)
      .toString();
  }

  public toFormat(
    decimals?: number,
    rounding?: BigNumber.RoundingMode,
  ): string {
    if (!decimals || this.decimals === decimals) return this.number.toString();

    return new BigNumber(this.toExact(decimals, rounding))
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toString();
  }

  public equalTo(other: BigintIsh | FixBigNumber): boolean {
    return this.number.isEqualTo(this.formalizeOtherDecimalsValueAsThis(other));
  }

  public lessThan(other: BigintIsh | FixBigNumber): boolean {
    return this.number.isLessThan(
      this.formalizeOtherDecimalsValueAsThis(other),
    );
  }

  public greaterThan(other: BigintIsh | FixBigNumber): boolean {
    return this.number.isGreaterThan(
      this.formalizeOtherDecimalsValueAsThis(other),
    );
  }

  public greaterThanOrEqualTo(other: BigintIsh | FixBigNumber): boolean {
    return this.number.gte(this.formalizeOtherDecimalsValueAsThis(other));
  }

  public lessThanOrEqualTo(other: BigintIsh | FixBigNumber): boolean {
    return this.number.lte(this.formalizeOtherDecimalsValueAsThis(other));
  }

  private formalizeOtherDecimalsValueAsThis(
    other: BigintIsh | FixBigNumber,
  ): BigNumber {
    if (other instanceof FixBigNumber) {
      return this.decimals === other.decimals
        ? other.number
        : FixBigNumber.toWei(other.toExact(), this.decimals).number;
    }

    return new BigNumber(other).multipliedBy(this.decimalScale);
  }
}
