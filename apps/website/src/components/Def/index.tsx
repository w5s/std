import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { definitions } from './definitions';

export interface DefProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'children'> {
  children: keyof typeof definitions;
}

/**
 * A component to display a definition with a tooltip.
 *
 * @example
 * <Def>FP</Def>
 * @param props
 */
export function Def(props: DefProps) {
  return <span {...props} className={clsx(styles.def, props.className)} title={definitions[props.children]} />;
}
