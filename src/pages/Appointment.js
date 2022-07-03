
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DateNavigator, Toolbar, ViewSwitcher, DayView, WeekView, MonthView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect, useContext, Fragment } from 'react';

import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './Appointments.module.css';
import Card from '../components/UI/Card';





const Appointment = () => {
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [schedulerData, setSchedularData] = useState([
        { id: 1, startDate: '2022-06-29T09:45', endDate: '2022-06-29T11:00', title: 'Meeting', notes: '' },
        { id: 2, startDate: '2022-06-28T15:00', endDate: '2022-06-28T13:30', title: 'Go to a gym', notes: '' },
    ]);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/appointments/${auth.userId}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                if (responseData.length > 0) {
                    responseData.map(appointment => {
                        return appointment.id = appointment._id;
                    });
                }
                setSchedularData(responseData);

            } catch (err) { }

        };
        fetchAppointments();
    }, [sendRequest]);


    const commitChanges = async ({ added, changed, deleted }) => {
    
        if (typeof (added) !== 'undefined') {
            const responseData = await sendRequest(`http://localhost:5000/appointments/${auth.userId}`, 'POST',
                JSON.stringify({
                    startDate: added.startDate,
                    endDate: added.endDate,
                    title: added.title,
                    notes: added.notes
                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });

            setSchedularData(state => {
                return [...state, responseData]
            })
        }
        if (typeof (changed) !== 'undefined') {
            let appId;
            let startDate;
            let endDate;
            let title;
            let notes;
            for (let i in changed) {
                appId = i;
                const temp = changed[i];
                title = temp.title;
                startDate = temp.startDate;
                endDate = temp.endDate;
                notes = temp.notes
            };
            const responseData = await sendRequest(`http://localhost:5000/appointments/${auth.userId}`, 'PATCH',
                JSON.stringify({
                    appId,
                    startDate: startDate,
                    endDate: endDate,
                    title: title,
                    notes: notes
                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            setSchedularData((state) => {
                return state.map((appointment) => {
                    return changed[appointment.id] ? responseData : appointment;
                });
            });

        }
        if (typeof (deleted) !== 'undefined') {
            const responseData = await sendRequest(`http://localhost:5000/appointments/${auth.userId}/${deleted}`, 'DELETE',
                null, {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            setSchedularData((state) => {
                return state.filter(appointment => {
                    return appointment.id !== deleted;
                });
            });
        }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.appointments}>
                <Scheduler data={schedulerData} >
                    <ViewState defaultCurrentViewName='Week' />
                    <EditingState onCommitChanges={commitChanges} />
                    <IntegratedEditing />
                    <DayView />
                    <WeekView startDayHour={8} endDayHour={20} />
                    <MonthView startDayHour={8} endDayHour={20}/>
                    <Toolbar />
                    <DateNavigator />
                    <ViewSwitcher />
                    <Appointments />
                    <AppointmentForm />
                </Scheduler>
            </Card>
        </Fragment>


    );
};

export default Appointment;