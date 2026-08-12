import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://heolqzakdwsvlhhrtdjn.supabase.co",
  "sb_publishable_9QsBYrVvfUEcUXHp96sgYQ_w8tWm7vi"
);

(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // Not logged in → SIGN UP
  if (!session) {
    window.location.replace(
      "https://ilyasbusiness2011-dot.github.io/ilyas-s_website/signup.html"
    );
    return;
  }

  // Logged in → check subscription
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("premium")
    .eq("id", session.user.id)
    .single();

  // Logged in but NOT subscribed → SUBSCRIBE
  if (error || profile?.premium !== true) {
    window.location.replace(
      "https://ilyasbusiness2011-dot.github.io/ilyas-s_website/subscribe.html"
    );
    return;
  }

  // Subscribed → allow access
  document.documentElement.style.visibility = "visible";
})();
