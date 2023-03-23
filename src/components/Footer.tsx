import React from 'react';

const Footer: React.FC = () => {

    return (
        <>
            <div className='footer' style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#fff', color: '#1b1b1b' }}>
                <p className='font-montserrat' style={{ fontWeight: 'bolder' }}>Copyright ©{new Date().getFullYear()} | Achmad Rizqi Agfian</p>
            </div>
        </>
    )
}

export default Footer;