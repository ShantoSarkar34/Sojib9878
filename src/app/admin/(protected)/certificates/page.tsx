import { getCertificates } from "@/features/certificates/queries"
import { CertificatesTable } from "@/components/admin/certificates/certificates-table"

export default async function AdminCertificatesPage() {
  const items = await getCertificates()

  return (
    <div>
      <h1 className="text-2xl font-bold">Certificates</h1>
      <p className="text-muted-foreground mt-1">Manage your certifications.</p>

      <div className="mt-6">
        <CertificatesTable items={items} />
      </div>
    </div>
  )
}
