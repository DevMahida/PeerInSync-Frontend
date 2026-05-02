
const Footer = () => {

    let Year = new Date().getFullYear();

    return (
        <>
            <footer className="bg-cs-footer01 p-4" >
                <div className="container">
                    <p className='text-white text-center m-0'><i className="ri-copyright-line"></i>{Year} PeerInSync. Built by Student for Students</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;