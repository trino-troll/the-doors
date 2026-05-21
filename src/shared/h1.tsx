import * as React from 'react';
import clsx from 'clsx';

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3';
}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
    ({ className, children, as: Component = 'h1', ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={clsx(
                    'text-center font-semibold mb-6',
                    {
                        'text-xl md:text-2xl lg:text-3xl': Component === 'h1',
                        'text-lg md:text-xl lg:text-2xl': Component === 'h2',
                        'text-base md:text-lg lg:text-xl': Component === 'h3',
                    },
                    className, // ← теперь можно переопределять
                )}
                {...props}
            >
                {children}
            </Component>
        );
    },
);
H1.displayName = 'H1';

export { H1 };
