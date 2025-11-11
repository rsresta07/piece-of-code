import { setCookie } from "cookies-next";
import showNotify from "../notify/notify";

const handleLogin = async (data: any) => {
  try {
    // APILogin is assumed to be an imported function that handles the API call for login
    const res = await APILogin(data);

    if (res?.data?.user?.id) {
      const user = {
        id: res?.data?.user?.id,
        email: res?.data?.user?.email,
        role: res?.data?.user?.role,
      };

      setCookie("token", res?.data?.accessToken);
      setCookie("user", JSON.stringify(user));

      // Redirect based on role
      if (user?.role === "ORG") {
        window.location.href = "/admin-dashboard";
      } else if (user?.role === "INSTRUCTOR") {
        window.location.href = `/instructor-dashboard`;
      } else {
        console.log("Unknown role");
      }
    } else {
      showNotify("error", "Wrong credentials1");
    }
  } catch (error) {
    showNotify("error", "Wrong credentials");
  }
};
