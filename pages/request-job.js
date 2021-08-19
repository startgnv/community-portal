import React from 'react';
import dynamic from 'next/dynamic';

const RequestJob = () => {
    const RequestJobPage = dynamic(()=>import('src/components/Site/Job/RequestJobPage'), {ssr: false})
    return <RequestJobPage/>
};

export default RequestJob;