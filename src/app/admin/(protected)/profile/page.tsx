import { getProfile } from "@/features/profile/queries"
import { ProfileForm } from "@/components/admin/profile/profile-form"

export default async function AdminProfilePage() {
  const profile = await getProfile()

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-muted-foreground mt-1">
        This information powers your Hero, About, and Contact sections.
      </p>

      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
