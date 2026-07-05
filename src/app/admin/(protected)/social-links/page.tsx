import { getSocialLinks } from "@/features/profile/queries"
import { SocialLinksTable } from "@/components/admin/social-links/social-links-table"

export default async function AdminSocialLinksPage() {
  const items = await getSocialLinks()

  return (
    <div>
      <h1 className="text-2xl font-bold">Social Links</h1>
      <p className="text-muted-foreground mt-1">
        Manage the social links shown on your site.
      </p>

      <div className="mt-6">
        <SocialLinksTable items={items} />
      </div>
    </div>
  )
}
