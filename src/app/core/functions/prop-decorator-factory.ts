import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type SafeAny = any;

function propDecoratorFactory<T, D>(
  name: string,
  fallback: (v: T) => D,
): (target: SafeAny, propName: string) => void {
  function propDecorator(
    target: SafeAny,
    propName: string,
    safeAnyTypedPropertyDescriptor?: TypedPropertyDescriptor<SafeAny>,
  ): SafeAny {
    const privatePropName = `$$__zorroPropDecorator__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(
        `The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`,
      );
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
    });

    return {
      get(): string {
        return safeAnyTypedPropertyDescriptor &&
          safeAnyTypedPropertyDescriptor.get
          ? safeAnyTypedPropertyDescriptor.get.bind(this)()
          : this[privatePropName];
      },
      set(value: T): void {
        if (
          safeAnyTypedPropertyDescriptor &&
          safeAnyTypedPropertyDescriptor.set
        ) {
          safeAnyTypedPropertyDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      },
    };
  }

  return propDecorator;
}

/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using @InputBoolean alone without @Input? AOT needs @Input to be visible
 *
 * @howToUse
 * ```
 * @Input() @InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // @Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
export function InputBoolean(): any {
  return propDecoratorFactory('InputBoolean', toBoolean);
}

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}
