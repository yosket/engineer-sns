import { ArrowLeftIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
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
            <Link href="/">
              <a className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 md:mx-8">
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </a>
            </Link>
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
