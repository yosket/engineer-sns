import { NextPage } from 'next'
import { FC, useState } from 'react'
import EditProfileModal from '../components/EditProfileModal'
import PageHeader from '../components/PageHeader'
import { useIpData, useMe } from '../hooks/useUser'

type ListItemProps = {
  title: string
}

const ListItem: FC<ListItemProps> = ({ children, title }) => (
  <div className="py-2 md:py-4 px-4 md:px-8 flex space-x-4 justify-between items-center border-b last:border-0 border-gray-100 dark:border-gray-600">
    <span className="text-sm md:text-base text-gray-400 whitespace-nowrap">
      {title}
    </span>
    <span className="text-sm md:text-base text-black dark:text-white truncate">
      {children}
    </span>
  </div>
)

const AccountPage: NextPage = () => {
  const { data: me } = useMe()
  const { data: ipData } = useIpData()
  const [isEditProfileModalShown, setIsEditProfileModalShown] =
    useState<boolean>(false)

  return (
    <>
      <div>
        <PageHeader backTo="/" backButtonText="トップへ戻る">
          アカウント
        </PageHeader>
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="text-black dark:text-white">
            <div className="max-w-screen-sm mx-auto flex justify-between items-end pt-8 md:pt-12 pb-2 md:pb-4 px-4 md:px-8">
              <h2 className="text-gray-600 dark:text-gray-200 text-sm md:text-base font-bold">
                プロフィール
              </h2>
              <button
                className="text-blue-500 text-sm md:text-base"
                onClick={() => setIsEditProfileModalShown(true)}
              >
                登録・編集
              </button>
            </div>
          </div>
          <div className="max-w-screen-sm mx-auto bg-white dark:bg-gray-700 md:rounded-2xl">
            <ListItem title="IPアドレス">{ipData?.ip}</ListItem>
            <ListItem title="ユーザーID">{me?.id}</ListItem>
            <ListItem title="名前">{me?.name}</ListItem>
            <ListItem title="自己紹介文">{me?.description}</ListItem>
          </div>
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
