import { getSettings } from "@/features/settings/queries"
import { SettingsForm } from "@/components/admin/settings/settings-form"

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-1">Site-wide SEO and configuration.</p>

      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  )
}
