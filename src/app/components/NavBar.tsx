"use client";
import Link from "next/link";
import { useAuthDispatch, useAuthState } from "../../context/auth.context";
import { Fragment, use, useContext, useEffect, useState } from "react";
import { ArrowSquareDown } from "iconsax-react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  TOGGLE_NOTIFICATIONS,
  ToggleUserNotificationsResponse,
} from "../../graphql/mutations/toggle-user-notifications.mutation";
import { toast } from "react-toastify";
import { errorProps } from "../../utils/alert.utils";
import { ToastAlert } from "../../app/components/ToastAlert";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function DropdownMenu() {
  const authDispatch = useAuthDispatch();
  const router = useRouter();
  const auth = useAuthState();
  const [hasNotifications, setHasNotifications] = useState(
    auth.hasActiveNotifications
  );
  const [toggleUserNotifications, { loading }] =
    useMutation<ToggleUserNotificationsResponse>(TOGGLE_NOTIFICATIONS);

  const handleLogOut = () => {
    authDispatch({ type: "logout" });
    router.reload();
  };

  const handleToggle = async () => {
    try {
      const { data } = await toggleUserNotifications({
        variables: {
          value: !hasNotifications,
        },
      });
      setHasNotifications(
        !!data?.toggleUserNotifications.hasActiveNotifications
      );
    } catch (error) {
      toast.error(<ToastAlert error={error} />, errorProps);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold 
        text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {"templario0141@gmail.com"}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button className="w-full">
                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ">
                    <label className="relative inline-flex items-center w-full cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={hasNotifications}
                        className="sr-only peer"
                        onChange={handleToggle}
                      />
                      <div
                        className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
            rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute
             after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 
             after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"
                      ></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Notificaciones
                      </span>
                    </label>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogOut}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const MenuOptions = () => {
  return (
    <Fragment>
      <ul className="flex gap-8">
        <li className="text-slate-50">
          <Link href="/signin">Iniciar Sesión</Link>
        </li>
        <li className="text-slate-50">
          <Link href="/signup">Registrarse</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default function NabBar() {
  const auth = useAuthState();

  return (
    <div
      className="container mx-auto w-auto absolute right-0 left-0 h-28 items-center
    flex justify-between z-50"
    >
      <div>
        <h1 className="text-slate-50 font-extrabold text-3xl">VMOTOR</h1>
      </div>
      <div>{auth.isAuthenticated ? <DropdownMenu /> : <MenuOptions />}</div>
    </div>
  );
}
