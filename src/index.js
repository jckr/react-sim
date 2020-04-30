import React from 'react'
import styles from './styles.module.css'

export {default as Controls, StatefulControls} from './controls';
export {default as Frame} from './frame';
export {default as FlexRow} from './flex-row';
export {default as FlexColumn} from './flex-column';
export {default as Model, withTheme} from './model';
export {default as Play} from './play';
export {default as Range} from './range';
export {default as Stop} from './stop';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
