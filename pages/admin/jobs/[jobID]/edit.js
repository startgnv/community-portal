import dynamic from 'next/dynamic';

const EditPage = dynamic(()=> import('src/components/Admin/Jobs/EditJob'), {ssr: false});

export default EditPage;