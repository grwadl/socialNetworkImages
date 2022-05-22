import React from 'react';
import eye from '../../../assets/eye.svg';
import cl from './MyPassword.module.scss';
const MyPassword = ({ passwordShown, setPasswordShown, type, register, errors }) => {
    
    return (
        <div className={passwordShown[type] ? cl.showPassword + ' ' + cl.showPasswordActive : cl.showPassword}>
            <input className={cl.inputPasswordForm} placeholder={'' + type} name={'' + type} type={passwordShown[type] ? 'text' : 'password'} {...register(`${type}`)} />
            <div className={cl.imgWrapper}>
                {type === 'Password'
                    ?<img src={eye} alt="" onClick={() => setPasswordShown({ ...passwordShown, Password: !passwordShown.Password })} />
                    : <img src={eye} alt="" onClick={() => setPasswordShown({ ...passwordShown, RepeatedPassword: !passwordShown.RepeatedPassword })}/>
                }
                </div>
            {errors[type] && <div className={cl.error}>{errors && errors[type].message || 'Password should be longer than 6!'}</div>}
        </div>
    );
};

export default MyPassword;