import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


const EcoPage = () => {
    const router = useRouter();
    const { ecoID } = router.query;
    const EcosystemItemForm = dynamic(()=>import('src/components/Admin/Ecosystem/EcosystemItemForm'), {ssr: false});

    return <EcosystemItemForm ecoID={ecoID}/>
}

export default EcoPage;