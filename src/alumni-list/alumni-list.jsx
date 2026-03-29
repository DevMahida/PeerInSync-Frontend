import axios from 'axios';

import Header from '../header_footer/header.jsx';

import other from '../assets/images/user.png';
import man1 from '../assets/images/man1.png';
import woman from '../assets/images/woman.png';

import './alumni-list.css';
import { useEffect, useState } from 'react';

const Alumni_list = () => {

    const [alumniList, setAlumniList] = useState([]);

    // fetch events from data base
    const fetchAlumniList = () => {

        axios.get('https://peerinsync-backend-server.onrender.com/alumni/getalumni', { withCredentials: true })
            .then(response => {
                setAlumniList(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        fetchAlumniList();
    }, []);


    return (
        <>
            <Header />

            <main>
                <div className="container">

                    <div className='Alumni_list-wrapper border-3 rounded-3 mt-5 py-4 px-3 bg-cs-secondary1 border-brown'>

                        {/* title */}
                        <div className='mb-4'>
                            <h1 className='h3 text-brown'>Alumni List</h1>
                        </div>

                        {/* cards */}
                        <div className='row g-3'>
                            {alumniList.length === 0 ? (
                                <p>Alumni List is empty</p>
                            ) : (
                                alumniList
                                    .sort((a, b) => a.fName.localeCompare(b.fName))
                                    .map(alumniList => (
                                        <div key={alumniList._id} className='col-md-6'>
                                            <div className='alumni-list-card p-3 bg-cs-primary1 rounded-3'>

                                                {/* profile */}
                                                <div className='gap-3 d-flex mb-2'>

                                                    {/* profile logo */}
                                                    <div>
                                                        {alumniList.gender == "male" ? (
                                                            <img className='img-fluid' src={man1} alt="" />
                                                        ) : alumniList.gender == "female" ? (
                                                            <img className='img-fluid' src={woman} alt="" />
                                                        ) : (
                                                            <img className='img-fluid' src={other} alt="" />
                                                        )
                                                        }
                                                    </div>

                                                    {/* profile-details */}
                                                    <div>
                                                        <h4>{alumniList.fName + " " + alumniList.lName}</h4>
                                                        <p className='m-0 fw-medium'>{alumniList.course_name}</p>
                                                        <p className='m-0 fw-medium fs-6'><strong>{alumniList.designation}</strong> at <strong>{alumniList.company_organization}</strong></p>
                                                    </div>

                                                </div>

                                                {/* expertice */}
                                                <div className="mt-2 d-flex gap-2">
                                                    <span><strong className="mb-1">Expertise:</strong></span>

                                                    <div className="d-flex flex-wrap gap-2">
                                                        {alumniList.areas_of_expertise?.length > 0 ? (
                                                            alumniList.areas_of_expertise.map((exp, index) => (
                                                                <span key={index} className="badge bg-cs-secondary1 text-dark px-3 py-2 rounded-3">
                                                                    {exp}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-muted">No expertise added</span>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}

export default Alumni_list