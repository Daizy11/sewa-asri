import { useRef } from "react";
import { Button, Input } from "../../components";

import "./../../styles/css/pages/auth.css";

import logo from "./../../assets/logo.png";
import villaPhoto_1 from "./../../assets/images/image 1.png"
import villaPhoto_2 from "./../../assets/images/image 2.png"
import villaPhoto_3 from "./../../assets/images/image 3.png"
import villaPhoto_4 from "./../../assets/images/image 4.png"

export function ForgotPasswordVerfication() {
    const emailRef = useRef("");

    return (
        <>  
            <div className="ellipse" />
            <div className="ellipse" />

            <main  className="auth-container">
                <section  className="hero-section" >
                    <h1 className="h1-bold">
                        Kelola Villa Praktis Dengan <span style={{ color: 'var(--primary-400)'}}>Sewa Asri Tenant</span>
                    </h1>

                    <article  className="image-gallery" >
                        <img className="image" src={villaPhoto_1} />
                        <img className="image" src={villaPhoto_2} />
                        <img className="image" src={villaPhoto_3} />
                        <img className="image" src={villaPhoto_4} />
                    </article>
                </section>

                <section className="form">

                    <header className="content">

                        <img src={logo} className="logo" />

                        <article className="detail">

                            <h3 className="h3-medium title">Verifikasi email</h3>
                            <p className="p-regular subtitle">Kami telah mengirim kode verifikasi ke email yang anda masukan, silahkan cek kotak masuk atau folder spam.</p>
                        </article>
                    </header>

                    <Input  variant="email"
                            label="Kode verifikasi"
                            required={true}
                            placeholder="199101"
                                
                            onInputHandler={(text) => {
                                emailRef.current = text;
                            }}

                            showMessage={false}
                                
                            />

                    <section   className="actions" >

                        <Button     behavior="fill-container"  
                                    size="large"
                                    label="Verifikasi"
                                    variant="primary"
                                    state="active"
                        
                                    onClickHandler={() => {
                                        console.info(`emailRef: ${emailRef.current}`)
                                    }}
                                    />

                        <Button     behavior="fill-container"  
                                    size="large"
                                    label="Kirim ulang kode verifikasi"
                                    variant="secondary"
                                    state="active"
                        
                                    onClickHandler={() => {
                                        console.info(`emailRef: ${emailRef.current}`)
                                    }}
                                    />

                    </section>
                </section>
            </main>
        </>
    );
}