import React, {useState} from 'react';
import {Input, Button}  from 'antd';
import {createGuest, checkGuest} from '../../services/guestService';

const MisafirEkle = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const cleanStates = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
    }
    const requestCreateGuest = async () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        const check = await checkGuest({email: email});
        if(check.data.length == 0){
            const response = await createGuest(data);
            if(response.status == 201) {
                alert("Misafir başarı ile oluşturuldu.");
                window.location.reload();
            }
        }
        
        else {
            alert("Zaten bu mail ile bir misafir kaydedilmiş!");
            cleanStates();
        }
       
     }
    return(
        <div className="d-flex flex-column">
            <div className="mt-2">
                <Input value={firstName} onChange = {handleFirstNameChange} placeholder="Misafir ad" />
            </div>
            <div className="mt-2">
                <Input value={lastName} onChange = {handleLastNameChange} placeholder="Misafir soyad" />
            </div>
            <div className="mt-2">
                <Input value={email} onChange = {handleEmailChange} placeholder="Misafir email" />
            </div>
            <div className="mt-2 d-flex justify-content-end">
                <Button onClick = {requestCreateGuest} type="primary" size="small">
                    Misafir Oluştur
                </Button>
            </div>
            
        </div>
    )
}

export default MisafirEkle;