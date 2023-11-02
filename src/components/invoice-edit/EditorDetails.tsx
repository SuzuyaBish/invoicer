import { useEditorInformationStore } from "@/lib/stores/editor-information"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function EditorDetails() {
  const table = useEditorTableStateStore()
  const info = useEditorInformationStore()
  return (
    <div className="flex flex-col space-y-12">
      <div>
        <h2 className="text-foreground text-base font-semibold leading-7">
          Your Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Full Name</Label>
          <Input
            placeholder="Jane Doe"
            type="text"
            value={info.information.from.name}
            onChange={(e) => info.setFromName(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Address</Label>
          <Input
            placeholder="123 Main St"
            type="text"
            value={info.information.from.address}
            onChange={(e) => info.setFromAddress(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>City</Label>
          <Input
            placeholder="Buffalo"
            type="text"
            value={info.information.from.city}
            onChange={(e) => info.setFromCity(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>State</Label>
          <Input
            placeholder="New York"
            type="text"
            value={info.information.from.state}
            onChange={(e) => info.setFromState(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Zip Code</Label>
          <Input
            placeholder="10001"
            type="text"
            value={info.information.from.zipCode}
            onChange={(e) => info.setFromZipCode(e.target.value)}
          />
        </div>
      </form>

      <div className="border-t">
        <h2 className="text-foreground mt-5 text-base font-semibold leading-7">
          Client Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Full Name</Label>
          <Input
            placeholder="Jane Doe"
            type="text"
            value={info.information.to.name}
            onChange={(e) => info.setToName(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Address</Label>
          <Input
            placeholder="123 Main St"
            type="text"
            value={info.information.to.address}
            onChange={(e) => info.setToAddress(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>City</Label>
          <Input
            placeholder="Buffalo"
            type="text"
            value={info.information.to.city}
            onChange={(e) => info.setToCity(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>State</Label>
          <Input
            placeholder="New York"
            type="text"
            value={info.information.to.state}
            onChange={(e) => info.setToState(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Zip Code</Label>
          <Input
            placeholder="10001"
            type="text"
            value={info.information.to.zipCode}
            onChange={(e) => info.setToZipCode(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}
