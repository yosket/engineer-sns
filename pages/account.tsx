import { NextPage } from 'next'
import { useState } from 'react'
import EditProfileModal from '../components/EditProfileModal'

const AccountPage: NextPage = () => {
  const [isEditProfileModalShown, setIsEditProfileModalShown] =
    useState<boolean>(false)

  return (
    <>
      <div className="p-4 md:p-8 max-w-screen-sm mx-auto">
        <h1 className="text-xl font-bold">アカウント</h1>
        <section className="border-b border-gray-200 p-4 md:p-8 space-y-4 first:border-t">
          <h2>プロフィール</h2>
          <p>
            <button
              className="bg-gray-200 text-gray-600 rounded-xl py-2 px-8"
              onClick={() => setIsEditProfileModalShown(true)}
            >
              登録・編集
            </button>
          </p>
        </section>
      </div>

      <EditProfileModal
        shown={isEditProfileModalShown}
        hide={() => setIsEditProfileModalShown(false)}
      />
    </>
  )
}

export default AccountPage
