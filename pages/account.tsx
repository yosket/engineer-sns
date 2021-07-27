import { NextPage } from 'next'
import { useState } from 'react'
import BackButton from '../components/BackButton'
import EditProfileModal from '../components/EditProfileModal'

const AccountPage: NextPage = () => {
  const [isEditProfileModalShown, setIsEditProfileModalShown] =
    useState<boolean>(false)

  return (
    <>
      <div className="">
        <div className="bg-gray-100">
          <div className="max-w-screen-sm mx-auto relative">
            <h1 className="text-lg p-2 font-bold text-center text-gray-600">
              アカウント
            </h1>
            <BackButton
              href="/"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 md:mx-8"
              iconClassName="w-6 h-6 text-gray-600"
            />
          </div>
        </div>
        <div className="max-w-screen-sm mx-auto">
          <section className="border-b border-gray-200 p-4 md:p-8 space-y-4">
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
      </div>

      <EditProfileModal
        shown={isEditProfileModalShown}
        hide={() => setIsEditProfileModalShown(false)}
      />
    </>
  )
}

export default AccountPage
