import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Card, GenericCardContent } from '../../styles/card';
import { withTranslation } from '../../utils/i18n';
import { maybeUpdatePassword } from '../../utils/password';
import { PrimaryHeading, SubHeading } from '../../styles/headings';
import { formStyle } from '../../styles/reset';
import { withToast } from '../../utils/toast';

const propTypes = {
    addToast: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            password: '',
            retypedPassword: '',
        };
    }

    handleChange = (field, event) => {
        this.resetHelpText(field);
        this.setState({ [field]: event.target.value });
    };

    resetHelpText = (resetType) => {
        if (resetType === 'global') {
            this.setState({
                passwordHelpText: null,
                retypedPasswordHelpText: null,
            });
        }

        if (resetType === 'password') {
            this.setState({
                passwordHelpText: null,
            });
        }

        if (resetType === 'retypedPassword') {
            this.setState({
                retypedPasswordHelpText: null,
            });
        }
    };

    validatePasswords = () => {
        const { t } = this.props;
        const { password, retypedPassword } = this.state;

        if (!password) {
            this.setState({
                passwordHelpText: t('message.error.emptyPassword'),
            });
        }

        if (!retypedPassword) {
            this.setState({
                retypedPasswordHelpText: t(
                    'message.error.emptyRetypedPassword',
                ),
            });
        }

        if (password && retypedPassword && password !== retypedPassword) {
            this.setState({
                retypedPasswordHelpText: t('message.error.mismatchedPassword'),
            });
        }

        if (!password || !retypedPassword || password !== retypedPassword) {
            return false;
        }

        return true;
    };

    resetForm = () => {
        this.setState({
            password: '',
            retypedPassword: '',
        });
    };

    handleSubmit = async (event) => {
        const { data, addToast, t } = this.props;
        const { password } = this.state;

        this.resetHelpText('global');
        event.preventDefault();

        const shouldSubmit = this.validatePasswords();

        if (shouldSubmit) {
            const result = maybeUpdatePassword(data.uid, password);

            result.then((serverData) => {
                if (serverData.data.uid) {
                    this.resetForm();

                    addToast(t('message.success'), {
                        appearance: 'success',
                    });
                }
            });
        }
    };

    renderInput = (input, value, helperText) => {
        const { t, classes } = this.props;

        return (
            <TextField
                id={input}
                label={t(`label.${input}`)}
                type='password'
                autoComplete='new-password'
                variant='outlined'
                className={classes.textField}
                size='small'
                onChange={(e) => this.handleChange(input, e)}
                helperText={helperText}
                value={value}
            />
        );
    };

    renderButton = () => {
        const { t, classes } = this.props;

        return (
            <Button
                variant='contained'
                color='primary'
                size='small'
                disableElevation
                className={classes.button}
                type='submit'
            >
                {t('common:submit')}
            </Button>
        );
    };

    renderPasswordGroup = () => {
        const { classes } = this.props;
        const {
            password,
            retypedPassword,
            passwordHelpText,
            retypedPasswordHelpText,
        } = this.state;

        return (
            <form className={classes.root} onSubmit={this.handleSubmit}>
                {this.renderInput('password', password, passwordHelpText)}
                {this.renderInput(
                    'retypedPassword',
                    retypedPassword,
                    retypedPasswordHelpText,
                )}
                {this.renderButton()}
            </form>
        );
    };

    renderHeading = () => {
        const { t, data } = this.props;

        return (
            <>
                <PrimaryHeading>{t('title')}</PrimaryHeading>
                <SubHeading>
                    {t('subheading', { email: data.email })}
                </SubHeading>
            </>
        );
    };

    render() {
        return (
            <Card>
                <GenericCardContent>
                    {this.renderHeading()}
                    {this.renderPasswordGroup()}
                </GenericCardContent>
            </Card>
        );
    }
}

PasswordForm.propTypes = propTypes;

export default withStyles(formStyle)(
    withToast(withTranslation(['reset', 'common'])(PasswordForm)),
);
