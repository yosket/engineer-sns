import { NextPage } from 'next'
import { FC, useState } from 'react'
import EditProfileModal from '../components/EditProfileModal'
import PageHeader from '../components/PageHeader'
import { useDayjs } from '../hooks/useDayjs'
import { useIpData, useMe } from '../hooks/useUser'

type SectionHeaderProps = {
  title: string
}

const SectionHeader: FC<SectionHeaderProps> = ({ children, title }) => (
  <div className="text-black dark:text-white">
    <div className="max-w-screen-sm mx-auto flex justify-between items-end pt-8 md:pt-12 pb-2 md:pb-4 px-4 md:px-8">
      <h2 className="text-gray-600 dark:text-gray-200 text-sm md:text-base font-bold">
        {title}
      </h2>
      {children}
    </div>
  </div>
)

const List: FC = ({ children }) => (
  <div className="max-w-screen-sm mx-auto bg-white dark:bg-gray-700 md:rounded-2xl">
    {children}
  </div>
)

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
  const dayjs = useDayjs()
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
          <SectionHeader title="プロフィール">
            <button
              className="text-blue-500 text-sm md:text-base"
              onClick={() => setIsEditProfileModalShown(true)}
            >
              登録・編集
            </button>
          </SectionHeader>
          <List>
            <ListItem title="IPアドレス">{ipData?.ip}</ListItem>
            <ListItem title="ユーザーID">{me?.id}</ListItem>
            <ListItem title="名前">{me?.name}</ListItem>
            <ListItem title="自己紹介文">{me?.description}</ListItem>
          </List>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800">
          <SectionHeader title="その他" />
          <List>
            <ListItem title="最終更新日">
              {dayjs(process.env.LAST_UPDATED).format('lll')}
            </ListItem>
            <ListItem title="運営">
              <a
                href="http://twitter.com/yosket87"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                @yosket87
              </a>
            </ListItem>
            <ListItem title="ソースコード">
              <a
                href="https://github.com/yosket/engineer-sns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Github
              </a>
            </ListItem>
          </List>
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
