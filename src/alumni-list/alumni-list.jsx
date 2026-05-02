import axios from 'axios';

import Header from '../header_footer/header.jsx';
import Footer from '../header_footer/footer.jsx'

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

    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const alumniPerPage = 8;

    const sortedAlumni = [...alumniList].sort((a, b) =>
        a.fName.localeCompare(b.fName)
    );

    const indexOfLastAlumni = currentPage * alumniPerPage;
    const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;

    const currentAlumni = sortedAlumni.slice(
        indexOfFirstAlumni,
        indexOfLastAlumni
    );

    const totalPages = Math.ceil(sortedAlumni.length / alumniPerPage);




    return (
        <>
            <Header />

            <main>
                <div className="container">

                    <div className='Alumni_list-wrapper border-3 rounded-3 my-5 pt-4 pb-3 px-3 bg-cs-secondary1 border-brown'>

                        {/* title */}
                        <div className='mb-4'>
                            <h1 className='h3 text-brown'>Alumni List</h1>
                        </div>

                        {/* cards */}
                        <div className='row g-3'>
                            {alumniList.length === 0 ? (
                                <p>Alumni List is empty</p>
                            ) : (
                                currentAlumni.map(alumni => (
                                    <div key={alumni._id} className='col-md-6'>
                                        <div className='alumni-list-card p-3 bg-cs-primary1 rounded-3'>

                                            {/* profile */}
                                            <div className='gap-3 d-flex mb-2'>

                                                <div>
                                                    {alumni.gender == "male" ? (
                                                        <img className='img-fluid' src={man1} alt="" />
                                                    ) : alumni.gender == "female" ? (
                                                        <img className='img-fluid' src={woman} alt="" />
                                                    ) : (
                                                        <img className='img-fluid' src={other} alt="" />
                                                    )}
                                                </div>

                                                <div>
                                                    <h4>{alumni.fName + " " + alumni.lName}</h4>
                                                    <p className='m-0 fw-medium'>{alumni.course_name}</p>
                                                    <p className='m-0 fw-medium fs-6'>
                                                        <strong>{alumni.designation}</strong> at <strong>{alumni.company_organization}</strong>
                                                    </p>
                                                </div>

                                            </div>

                                            {/* expertise */}
                                            <div className="mt-2 d-flex gap-2">
                                                <span><strong>Expertise:</strong></span>

                                                <div className="d-flex flex-wrap gap-2">
                                                    {alumni.areas_of_expertise_interest?.length > 0 ? (
                                                        alumni.areas_of_expertise_interest.map((exp, index) => (
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

                        {/* pagination */}
                        <nav>
                            <ul className="pagination mt-4 justify-content-center gap-2">

                                {/* Previous */}
                                <li>
                                    <button
                                        className="btn btn-outline-dark"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                    >
                                        Prev
                                    </button>
                                </li>

                                {/* Page numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <li key={page}>
                                        <button
                                            className={`btn ${currentPage === page ? "btn-dark" : "btn-outline-dark"}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}

                                {/* Next */}
                                <li>
                                    <button
                                        className="btn btn-outline-dark"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                    >
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </nav>

                    </div>
                </div>
            </main>

            {/* footer */}
            <Footer/>
        </>
    );

}

export default Alumni_list