import React from 'react';
import dynamic from 'next/dynamic';

const New = () => {
    const EcosystemItemForm = dynamic(()=>import('src/components/Admin/Ecosystem/EcosystemItemForm'), {ssr: false});
    return (
        <EcosystemItemForm/>
    )
}

export default New;