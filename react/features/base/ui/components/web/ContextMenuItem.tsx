import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { showOverflowDrawer } from '../../../../toolbox/functions.web';
import Icon from '../../../icons/components/Icon';
import { withPixelLineHeight } from '../../../styles/functions.web';
import { TEXT_OVERFLOW_TYPES } from '../../constants.any';

import TextWithOverflow from './TextWithOverflow';

export interface IProps {

    /**
     * Label used for accessibility.
     */
    accessibilityLabel: string;

    /**
     * Component children.
     */
    children?: ReactNode;

    /**
     * CSS class name used for custom styles.
     */
    className?: string;

    /**
     * Custom icon. If used, the icon prop is ignored.
     * Used to allow custom children instead of just the default icons.
     */
    customIcon?: ReactNode;

    /**
     * Whether or not the action is disabled.
     */
    disabled?: boolean;

    /**
     * Default icon for action.
     */
    icon?: Function;

    /**
     * Id of the action container.
     */
    id?: string;

    /**
     * Click handler.
     */
    onClick?: (e?: React.MouseEvent) => void;

    /**
     * Keydown handler.
     */
    onKeyDown?: (e?: React.KeyboardEvent) => void;

    /**
     * Keypress handler.
     */
    onKeyPress?: (e?: React.KeyboardEvent) => void;

    /**
     * Overflow type for item text.
     */
    overflowType?: TEXT_OVERFLOW_TYPES;

    /**
     * Whether the item is marked as selected.
     */
    selected?: boolean;

    /**
     * TestId of the element, if any.
     */
    testId?: string;

    /**
     * Action text.
     */
    text?: string;

    /**
     * Class name for the text.
     */
    textClassName?: string;
}

const useStyles = makeStyles()(theme => {
    return {
        contextMenuItem: {
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            minHeight: '40px',
            padding: '10px 16px',
            boxSizing: 'border-box',

            '& > *:not(:last-child)': {
                marginRight: theme.spacing(3)
            },

            '&:hover': {
                backgroundColor: theme.palette.ui02
            },

            '&:active': {
                backgroundColor: theme.palette.ui03
            },

            '&:focus': {
                boxShadow: `inset 0 0 0 2px ${theme.palette.action01Hover}`
            }
        },

        selected: {
            borderLeft: `3px solid ${theme.palette.action01Hover}`,
            paddingLeft: '13px',
            backgroundColor: theme.palette.ui02
        },

        contextMenuItemDisabled: {
            pointerEvents: 'none'
        },

        contextMenuItemDrawer: {
            padding: '13px 16px'
        },

        contextMenuItemIcon: {
            '& svg': {
                fill: theme.palette.icon01
            }
        },

        text: {
            ...withPixelLineHeight(theme.typography.bodyShortRegular),
            color: theme.palette.text01
        },

        drawerText: {
            ...withPixelLineHeight(theme.typography.bodyShortRegularLarge)
        }
    };
});

const ContextMenuItem = ({
    accessibilityLabel,
    children,
    className,
    customIcon,
    disabled,
    id,
    icon,
    onClick,
    onKeyDown,
    onKeyPress,
    overflowType,
    selected,
    testId,
    text,
    textClassName }: IProps) => {
    const { classes: styles, cx } = useStyles();
    const _overflowDrawer: boolean = useSelector(showOverflowDrawer);

    return (
        <div
            aria-disabled = { disabled }
            aria-label = { accessibilityLabel }
            className = { cx(styles.contextMenuItem,
                    _overflowDrawer && styles.contextMenuItemDrawer,
                    disabled && styles.contextMenuItemDisabled,
                    selected && styles.selected,
                    className
            ) }
            data-testid = { testId }
            id = { id }
            key = { text }
            onClick = { disabled ? undefined : onClick }
            onKeyDown = { disabled ? undefined : onKeyDown }
            onKeyPress = { disabled ? undefined : onKeyPress }
            role = 'button'
            tabIndex = { disabled ? undefined : 0 }>
            {customIcon ? customIcon
                : icon && <Icon
                    className = { styles.contextMenuItemIcon }
                    size = { 20 }
                    src = { icon } />}
            {text && (
                <TextWithOverflow
                    className = { cx(styles.text,
                    _overflowDrawer && styles.drawerText,
                    textClassName) }
                    overflowType = { overflowType } >
                    {text}
                </TextWithOverflow>
            )}
            {children}
        </div>
    );
};

export default ContextMenuItem;
