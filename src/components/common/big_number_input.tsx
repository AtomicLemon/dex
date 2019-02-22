import { BigNumber } from '0x.js';
import React from 'react';

import { tokenAmountInUnits, unitsInTokenAmount } from '../../util/tokens';

interface Props {
    autofocus?: boolean;
    className?: string;
    decimals: number;
    max?: BigNumber;
    min?: BigNumber;
    onChange: (newValue: BigNumber) => void;
    step?: BigNumber;
    value: BigNumber;
}

interface State {
    currentValueStr: string;
}

export class BigNumberInput extends React.Component<Props, State> {
    public readonly state = {
        currentValueStr: tokenAmountInUnits(this.props.value, this.props.decimals),
    };

    private _textInput: any;

    public static getDerivedStateFromProps = (props: Props, state: State) => {
        const { decimals, value } = props;
        const { currentValueStr } = state;

        if (!unitsInTokenAmount(currentValueStr || '0', decimals).eq(value)) {
            return {
                currentValueStr: tokenAmountInUnits(value, decimals),
            };
        } else {
            return null;
        }
    };

    public componentDidMount = () => {
        const { autofocus } = this.props;

        if (autofocus) {
            this._textInput.focus();
        }
    };

    public render = () => {
        const { currentValueStr } = this.state;
        const { decimals, step, min, max, className } = this.props;

        const stepStr = step && tokenAmountInUnits(step, decimals);
        const minStr = min && tokenAmountInUnits(min, decimals);
        const maxStr = max && tokenAmountInUnits(max, decimals);

        return (
            <input
                className={className}
                max={maxStr}
                min={minStr}
                onChange={this._updateValue}
                ref={_ref => (this._textInput = _ref)}
                step={stepStr}
                type={'number'}
                value={currentValueStr}
            />
        );
    };

    private readonly _updateValue: React.ReactEventHandler<HTMLInputElement> = e => {
        const { decimals, onChange, min, max } = this.props;
        const newValueStr = e.currentTarget.value;

        const newValue = unitsInTokenAmount(newValueStr || '0', decimals);
        const invalidValue = (min && newValue.lessThan(min)) || (max && newValue.greaterThan(max));
        if (invalidValue) {
            return;
        }

        onChange(newValue);

        this.setState({
            currentValueStr: newValueStr,
        });
    };
}