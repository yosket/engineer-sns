import { NextPage } from 'next'
import { useState } from 'react'
import EditProfileModal from '../components/EditProfileModal'
import PageHeader from '../components/PageHeader'

const AccountPage: NextPage = () => {
  const [isEditProfileModalShown, setIsEditProfileModalShown] =
    useState<boolean>(false)

  return (
    <>
      <div>
        <PageHeader backTo="/" backButtonText="トップへ戻る">
          アカウント
        </PageHeader>
        <div className="max-w-screen-sm mx-auto">
          <section className="border-b border-gray-200 dark:border-gray-600 p-4 md:p-8 space-y-4">
            <h2 className="text-black dark:text-white">プロフィール</h2>
            <p>
              <button
                className="bg-gray-200 dark:bg-gray-500 text-gray-600 dark:text-gray-200 rounded-xl py-2 px-8"
                onClick={() => setIsEditProfileModalShown(true)}
              >
                登録・編集
              </button>
            </p>
          </section>
        </div>
      </div>

      <EditProfileModal
        shown={isEditProfileModalShown}
        hide={() => setIsEditProfileModalShown(false)}
      />
    </>
  )
}

export default AccountPage
