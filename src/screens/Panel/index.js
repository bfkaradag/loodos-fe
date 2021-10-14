import React, {useState, useEffect} from 'react';
import AdminLayout from './Layout';
import RandevuEkle from './RandevuEkle';
import RandevuGuncelle from './RandevuGuncelle';
import RandevuListele from './RandevuListele';
import {getGuests} from '../../services/guestService';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Panel = () => {
    const [guests, setGuests] = useState([]);
    useEffect(async() => {
        const response = await getGuests();
        setGuests(response.data);
    }, []);
    return(
        <AdminLayout>
            <div className="d-flex justify-content-center algin-items-start outer">
               <div className="d-flex flex-column">
                   <div className="text-center"><h3>Panel</h3></div>
                    <Tabs defaultActiveKey="1" size="large" type="card">
                        <TabPane tab="Randevu Ekle" key="1">
                            <RandevuEkle guests = {guests} />
                        </TabPane>
                        <TabPane tab="Randevu Güncelle" key="2">
                            <RandevuGuncelle guests = {guests} />
                        </TabPane>
                        <TabPane tab="Randevu Listele" key="3">
                            <RandevuListele  guests = {guests} />
                        </TabPane>
                    </Tabs>
               </div>
            </div>
        </AdminLayout>
    )
}

export default Panel;