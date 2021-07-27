import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, ReactNode } from 'react'

type Props = {
  shown: boolean
  children: ReactNode
  hide?: () => void
  title?: string
  footerButtons?: ReactNode[]
}

const Modal: FC<Props> = ({ shown, hide, children, title, footerButtons }) => {
  const handleClose = () => {
    hide && hide()
  }

  return (
    <Transition show={shown} as={Fragment}>
      <Dialog
        onClose={handleClose}
        className="fixed z-10 inset-0 overflow-y-auto pointer-events-none flex items-center justify-center h-screen px-4 text-center"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay
            className="absolute inset-0 transition backdrop-filter backdrop-blur-sm pointer-events-auto"
            aria-hidden="true"
            onClick={hide}
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div
            className="inline-block bg-white text-left shadow-xl rounded-2xl transform transition-all align-middle max-w-lg w-full pointer-events-auto"
            role="dialog"
            aria-modal="true"
          >
            {title && (
              <div className="bg-gray-50 px-4 p-4 flex space-x-4 items-center rounded-t-2xl">
                <Dialog.Title className="flex-1">{title}</Dialog.Title>
                {hide && (
                  <button
                    className="text-3xl text-gray-400 -my-4 relative -right-4 py-2 px-4"
                    onClick={hide}
                  >
                    &times;
                  </button>
                )}
              </div>
            )}
            <div className="px-4 pt-5 pb-4">{children}</div>
            {footerButtons && (
              <div className="bg-gray-50 px-4 py-3 flex space-x-4 rounded-b-2xl">
                {footerButtons}
              </div>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
