import { PaperClipIcon } from "@heroicons/react/20/solid"

export default function ClientView({ params }: { params: { slug: string } }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-0">
        <h3 className="text-foreground text-base font-semibold leading-7">
          Applicant Information
        </h3>
        <p className="text-foreground mt-1 max-w-2xl text-sm leading-6">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t">
        <dl className="divide-border divide-y">
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Full name
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              Margot Foster
            </dd>
          </div>
          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Application for
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              Backend Developer
            </dd>
          </div>
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Email address
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              margotfoster@example.com
            </dd>
          </div>
          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Salary expectation
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              $120,000
            </dd>
          </div>
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              About
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Attachments
            </dt>
            <dd className="text-foreground mt-2 text-sm sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-border divide-y rounded-md border"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
