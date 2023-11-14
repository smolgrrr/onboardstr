import { useRouter } from 'next/router'
import Form from '@/components/Form'
import Referrer from '@/components/Referrer'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="flex items-center justify-center h-screen">
        <Referrer id={Array.isArray(id) ? id[0] : id || ''} />
        <Form />
    </ div>
  );
}