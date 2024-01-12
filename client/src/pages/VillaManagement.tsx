import Cookies from 'universal-cookie';

import villaJson from "./../data/villa.json";

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Header, Modal, Sidebar, ProfilePanel, MessageBar, CardVilla } from "../components";

import { ModalLogout, IMessageBar } from '../utils/interface';
import { useLogout } from '../hooks/useAuth';
import { getUser } from '../utils/userStore';

import { VillaInterfaces } from '../utils/villa-interfaces';

const cookies = new Cookies("auth-token", { path: '/' });

export function VillaManagement() {
    const navigate = useNavigate();

    const user = getUser();
    const { trigger:logout } = useLogout();

    const [profilePanel, setProfilePanel] = useState<"opened" | "closed">("closed");

    const [confirmLogout, setConfirmLogout] = useState<ModalLogout>({
        modal: "closed",
        logout: false
    }); 

    const [messagebar, setMessagebar] = useState<IMessageBar>({
        showMessageBar: false,
        variant: "error",
        message: ""
    }); 

    function onLogout() {
        const token = cookies.get("auth-token");

        logout({ token: token })

        .then((response) => {
            if (response.status === "success") {
                cookies.remove("auth-token");
                navigate({ to: "/login" });
            } 
            else {
                setMessagebar({
                    showMessageBar: true,
                    message: "Logout gagal silahkan coba beberapa saat lagi"
                });
            }
        })
        .catch(() => {
            setMessagebar({
                showMessageBar: true,
                message: "Terjadi kesalahan di sisi server, silahkan soba beberapa saat lagi"
            });
        });
    }

    // function onSearchVilla() {
        
    // }

    if (messagebar.showMessageBar) {
        setTimeout(() => {
            setMessagebar({
                showMessageBar: false,
                message: "Logout gagal silahkan coba beberapa saat lagi "
            });
        }, 2000);
    }
    console.count("VillaManagement.tsx Re-render");

    return (
        <main  className="dashboard-container">
            <Sidebar />

            <section  className="main-container">
                <Header variant="main" 
                        onHoverProfile={() => setProfilePanel("opened")} 
                        />
                
                <section  className="widget">

                    <Header variant="villa-management"
                            
                            onCreateVillaHandler={() => {
                                navigate({ to: "create-new-villa" });
                            }}
                            />

                    <ListVilla data={villaJson}/>
                </section>



                <ProfilePanel   state={profilePanel} 
                                onMouseLeave={() => setProfilePanel("closed")} 
                                    
                                onLogoutHandler={() => {
                                    setConfirmLogout({
                                        modal: "opened",
                                        logout: false
                                    });
                                }}
                                    
                                name={user?.name}
                                photo={user?.photo}
                                />

                <Modal  variant="default"
                        title="Keluar"
                        description="Apakah kamu ingin mengeluarkan akun mu dari perangkat ini?"
                            
                        action1Label="Iya, keluar"
                        action2Label="Tidak"

                        state={confirmLogout.modal}

                        action1Handler={() => {
                            setConfirmLogout({
                                modal: "closed",
                                logout: true
                            });

                            onLogout();
                        }}

                        action2Handler={() => {
                            setConfirmLogout({
                                modal: "closed",
                                logout: false
                            });
                        }}
                        />

                <MessageBar message={messagebar.message}
                            variant='error'
                            showMessageBar={messagebar.showMessageBar}
                            />
            </section>
        </main>
    );
}

function ListVilla({ data }: { data: Array<VillaInterfaces> }) {
    return (
        <section className='list-villa-container'>
            {
                data.map(( villa ) => {
                    return <CardVilla key={villa._id} data={villa} />
                })
            }
        </section>
    );
}