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
        if (field === 'password') {
            this.setState({
                passwordHelpText: null,
            });
        }

        if (field === 'retypedPassword') {
            this.setState({
                retypedPasswordHelpText: null,
            });
        }

        this.setState({ [field]: event.target.value });
    };

    resetHelpText = () => {
        this.setState({
            passwordHelpText: null,
            retypedPasswordHelpText: null,
        });
    };

    validatePasswords = () => {
        const { t } = this.props;
        const { password, retypedPassword } = this.state;

        if (!password) {
            this.setState({
                passwordHelpText: t('message.error.emptyPassword'),
            });
            return false;
        }

        if (!retypedPassword) {
            this.setState({
                retypedPasswordHelpText: t(
                    'message.error.emptyRetypedPassword',
                ),
            });
            return false;
        }

        if (password && retypedPassword && password !== retypedPassword) {
            this.setState({
                retypedPasswordHelpText: t('message.error.mismatchedPassword'),
            });
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

        this.resetHelpText();
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

    renderPasswordGroup = () => {
        const { t, classes } = this.props;
        const {
            password,
            retypedPassword,
            passwordHelpText,
            retypedPasswordHelpText,
        } = this.state;

        return (
            <form className={classes.root} onSubmit={this.handleSubmit}>
                <TextField
                    id='password'
                    label={t('label.password')}
                    type='password'
                    autoComplete='new-password'
                    variant='outlined'
                    className={classes.textField}
                    size='small'
                    onChange={(e) => this.handleChange('password', e)}
                    helperText={passwordHelpText}
                    value={password}
                />
                <TextField
                    id='retypedPassword'
                    label={t('label.retypePassword')}
                    type='password'
                    autoComplete='new-password'
                    variant='outlined'
                    className={classes.textField}
                    size='small'
                    onChange={(e) => this.handleChange('retypedPassword', e)}
                    helperText={retypedPasswordHelpText}
                    value={retypedPassword}
                />
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
            </form>
        );
    };

    render() {
        const { t, data } = this.props;

        return (
            <Card>
                <GenericCardContent>
                    <PrimaryHeading>{t('title')}</PrimaryHeading>
                    <SubHeading>
                        {t('subheading', { email: data.email })}
                    </SubHeading>
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
