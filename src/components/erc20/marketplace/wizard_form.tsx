import React from 'react';
import { Field, Form } from 'react-final-form';
import styled, { withTheme } from 'styled-components';

import { themeDimensions } from '../../../themes/commons';
import { ButtonVariant } from '../../../util/types';
import { Button } from '../../common/button';
import { Card } from '../../common/card';
import { CheckboxInput } from '../../common/final_form/check_box_input';
import { MultiCheckboxInput } from '../../common/final_form/multi_checkbox_input';
import { MultiSelectInput } from '../../common/final_form/multi_select_input';
import { NumberInput } from '../../common/final_form/number_input';
import { RadioInput } from '../../common/final_form/radio_';
import { SelectInput } from '../../common/final_form/select_input';
import { TextAreaInput } from '../../common/final_form/text_area_input';
import { TextInput } from '../../common/final_form/text_input';

const onSubmit = async (values: any) => {
    window.alert(JSON.stringify(values, undefined, 2));
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px ${themeDimensions.horizontalPadding};
`;

const LabelContainer = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;
const ButtonsContainer = styled.div`
    align-items: flex-start;
    display: flex;
    margin: 10px;
`;
const ButtonContainer = styled.div`
    padding: 10px;
`;

const Label = styled.label<{ color?: string }>`
    color: ${props => props.color || props.theme.componentsTheme.textColorCommon};
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    margin: 0;
`;
const FieldContainer = styled.div`
    height: ${themeDimensions.fieldHeight};
    margin-bottom: 10px;
    position: relative;
`;

class WizardForm extends React.PureComponent {
    public render = () => {
        let content: React.ReactNode;

        content = (
            <Content>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ stooge: 'larry', employed: false }}
                    // tslint:disable-next-line: jsx-no-lambda boolean-naming
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <LabelContainer>
                                <Label>First Name</Label>
                            </LabelContainer>
                            <FieldContainer>
                                <Field<string> name="firstName" component={TextInput} placeholder="First Name*" />
                            </FieldContainer>
                            <LabelContainer>
                                <Label>First Name</Label>
                            </LabelContainer>
                            <FieldContainer>
                                <Field<string> name="lastName" component={TextInput} placeholder="Last Name" />
                            </FieldContainer>
                            <div>
                                <LabelContainer>
                                    <Label>First Name</Label>
                                </LabelContainer>
                                <Field<number> name="age" component={NumberInput} placeholder="Age" />
                            </div>
                            <div>
                                <LabelContainer>
                                    <Label>First Name</Label>
                                </LabelContainer>
                                <Field<boolean> name="employed" type="checkbox" component={CheckboxInput} />
                            </div>
                            <div>
                                <LabelContainer>
                                    <Label>First Name</Label>
                                </LabelContainer>
                                <Field<string> name="favoriteColor" component={SelectInput}>
                                    <option />
                                    <option value="#ff0000">❤️ Red</option>
                                    <option value="#00ff00">💚 Green</option>
                                    <option value="#0000ff">💙 Blue</option>
                                </Field>
                            </div>
                            <div>
                                <LabelContainer>
                                    <Label>First Name</Label>
                                </LabelContainer>
                                <Field<string[]> name="toppings" component={MultiSelectInput}>
                                    <option value="chicken">🐓 Chicken</option>
                                    <option value="ham">🐷 Ham</option>
                                    <option value="mushrooms">🍄 Mushrooms</option>
                                    <option value="cheese">🧀 Cheese</option>
                                    <option value="tuna">🐟 Tuna</option>
                                    <option value="pineapple">🍍 Pineapple</option>
                                </Field>
                            </div>
                            <div>
                                <LabelContainer>
                                    <Label>Sauce</Label>
                                </LabelContainer>
                                <div>
                                    <label>
                                        <Field<string>
                                            name="sauces"
                                            component={MultiCheckboxInput}
                                            type="checkbox"
                                            value="ketchup"
                                        />{' '}
                                        Ketchup
                                    </label>
                                    <label>
                                        <Field<string>
                                            name="sauces"
                                            component="input"
                                            type="checkbox"
                                            value="mustard"
                                        />{' '}
                                        Mustard
                                    </label>
                                    <label>
                                        <Field<string>
                                            name="sauces"
                                            component="input"
                                            type="checkbox"
                                            value="mayonnaise"
                                        />{' '}
                                        Mayonnaise
                                    </label>
                                    <label>
                                        <Field<string>
                                            name="sauces"
                                            component="input"
                                            type="checkbox"
                                            value="guacamole"
                                        />{' '}
                                        Guacamole 🥑
                                    </label>
                                </div>
                            </div>
                            <div>
                                <LabelContainer>
                                    <Label>First Name</Label>
                                </LabelContainer>
                                <Field name="notes" component={TextAreaInput} placeholder="Notes" />
                            </div>
                            <ButtonsContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={form.submit}
                                        disabled={submitting || pristine}
                                        variant={ButtonVariant.Buy}
                                    >
                                        Submit
                                    </Button>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                        variant={ButtonVariant.Sell}
                                    >
                                        Reset
                                    </Button>
                                </ButtonContainer>
                            </ButtonsContainer>
                            <pre>{JSON.stringify(values, undefined, 2)}</pre>
                        </form>
                    )}
                />
            </Content>
        );

        return <Card title="DEX Wizard">{content}</Card>;
    };
}

const WizardFormWithTheme = withTheme(WizardForm);

export { WizardForm, WizardFormWithTheme };
