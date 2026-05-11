import { useState, useCallback } from "react";
import { userSignIn, userSignUp } from "../actions/auth";

/* ─────────────────────────────────────────
   SVG Icons
───────────────────────────────────────── */
const EmailIcon = ({ active }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#b5f542" : "#4b5563"}
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = ({ active }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#b5f542" : "#4b5563"}
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIcon = ({ active }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#b5f542" : "#4b5563"}
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EyeIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const MatchOkIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#b5f542"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const MatchErrIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2.5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─────────────────────────────────────────
   Password strength helper
───────────────────────────────────────── */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "Weak", barColor: "#ef4444", textColor: "#f87171" },
    { label: "Fair", barColor: "#f59e0b", textColor: "#fbbf24" },
    { label: "Good", barColor: "#eab308", textColor: "#facc15" },
    { label: "Strong", barColor: "#b5f542", textColor: "#b5f542" },
  ];
  return { score, ...levels[Math.max(0, score - 1)] };
}

/* ─────────────────────────────────────────
   Reusable Field wrapper
───────────────────────────────────────── */
function Field({ label, icon, focused, suffix, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] tracking-[0.14em] text-gray-600 uppercase">
        {label}
      </label>
      <div
        className="flex items-center gap-2.5 bg-[#13151a] rounded-xl px-3.5 py-2.5 border transition-all duration-200"
        style={{
          borderColor: focused ? "#b5f542" : "#1c1f27",
          boxShadow: focused ? "0 0 0 3px rgba(181,245,66,0.07)" : "none",
        }}
      >
        <span className="shrink-0">{icon}</span>
        {children}
        {suffix && <span className="shrink-0">{suffix}</span>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Submit Button
───────────────────────────────────────── */
function SubmitBtn({ label, loading, done, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || done}
      className={[
        "w-full mt-2 py-3 rounded-xl font-bold text-sm tracking-wide",
        "flex items-center justify-center gap-2 transition-all duration-200",
        done
          ? "cursor-default text-[#b5f542]"
          : "hover:brightness-110 active:scale-[0.99] cursor-pointer text-[#0c0d10]",
      ].join(" ")}
      style={{ background: done ? "#2e4d0a" : "#b5f542" }}
    >
      {done ? (
        <>
          <CheckIcon /> Done
        </>
      ) : loading ? (
        <span className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#0c0d10] animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.9s",
              }}
            />
          ))}
        </span>
      ) : (
        <>
          {label} <ArrowIcon />
        </>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   Sign In Form
───────────────────────────────────────── */
function SignInForm({ onSwitch }) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = useCallback(
    (key, val) => setFields((prev) => ({ ...prev, [key]: val })),
    [],
  );

  const handleSubmit = async () => {
    if (!fields.email || !fields.password || loading || done) return;

    try {
      setLoading(true);

      await userSignIn(fields);

      setDone(true);
    } catch (error) {
      console.log(error);
      alert("Sign In Failed");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-1">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#b5f542] block mb-1">
          RETURNING USER
        </span>
        <h2 className="text-[28px] font-extrabold text-gray-100 leading-tight">
          Welcome<span className="text-[#b5f542]">.</span>
        </h2>
        <p className="font-mono text-[11px] text-gray-600 mt-1">
          Sign in to your workspace.
        </p>
      </div>

      <Field
        label="Email Address"
        icon={<EmailIcon active={focused === "email"} />}
        focused={focused === "email"}
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type="email"
          placeholder="you@workspace.io"
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      <Field
        label="Password"
        icon={<LockIcon active={focused === "password"} />}
        focused={focused === "password"}
        suffix={
          <button
            onClick={() => setShowPass((p) => !p)}
            className="cursor-pointer bg-transparent border-none p-0 flex items-center"
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type={showPass ? "text" : "password"}
          placeholder="••••••••••••"
          value={fields.password}
          onChange={(e) => set("password", e.target.value)}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      <div className="flex justify-end -mt-2">
        <button className="font-mono text-[11px] text-gray-600 hover:text-[#b5f542] underline decoration-gray-800 transition-colors cursor-pointer bg-transparent border-none p-0">
          Forgot password?
        </button>
      </div>

      <SubmitBtn
        label="Sign In"
        loading={loading}
        done={done}
        onClick={handleSubmit}
      />

      <p className="text-center font-mono text-[11px] text-gray-600 mt-1">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#b5f542] hover:underline cursor-pointer bg-transparent border-none p-0 font-mono text-[11px]"
        >
          Create one →
        </button>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Sign Up Form
───────────────────────────────────────── */
function SignUpForm({ onSwitch }) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = useCallback(
    (key, val) => setFields((prev) => ({ ...prev, [key]: val })),
    [],
  );

  const strength = getStrength(fields.password);
  const passwordMatch =
    fields.confirm.length > 0 && fields.confirm === fields.password;
  const passwordMismatch =
    fields.confirm.length > 0 && fields.confirm !== fields.password;
  const isValid =
    fields.name && fields.email && fields.password && passwordMatch;
  const handleSubmit = async () => {
    if (!isValid || loading || done) return;

    try {
      setLoading(true);

      await userSignUp(fields);

      console.log(data);

      setDone(true);
    } catch (error) {
      console.log(error);
      alert("Sign Up Failed");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      <div className="mb-1">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#b5f542] block mb-1">
          NEW USER
        </span>
        <h2 className="text-[28px] font-extrabold text-gray-100 leading-tight">
          Create<span className="text-[#b5f542]">.</span>
        </h2>
        <p className="font-mono text-[11px] text-gray-600 mt-1">
          Set up your workspace account.
        </p>
      </div>

      <Field
        label="Full Name"
        icon={<UserIcon active={focused === "name"} />}
        focused={focused === "name"}
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type="text"
          placeholder="Jane Doe"
          value={fields.name}
          onChange={(e) => set("name", e.target.value)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      <Field
        label="Email Address"
        icon={<EmailIcon active={focused === "email"} />}
        focused={focused === "email"}
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type="email"
          placeholder="you@workspace.io"
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      <Field
        label="Password"
        icon={<LockIcon active={focused === "password"} />}
        focused={focused === "password"}
        suffix={
          <button
            onClick={() => setShowPass((p) => !p)}
            className="cursor-pointer bg-transparent border-none p-0 flex items-center"
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type={showPass ? "text" : "password"}
          placeholder="Min. 8 characters"
          value={fields.password}
          onChange={(e) => set("password", e.target.value)}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      {fields.password.length > 0 && (
        <div className="flex items-center gap-1.5 -mt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-all duration-300"
              style={{
                background: i < strength.score ? strength.barColor : "#1e2128",
              }}
            />
          ))}
          <span
            className="font-mono text-[10px] min-w-[44px] text-right transition-colors duration-300"
            style={{ color: strength.textColor }}
          >
            {strength.label}
          </span>
        </div>
      )}

      <Field
        label="Confirm Password"
        icon={<LockIcon active={focused === "confirm"} />}
        focused={focused === "confirm"}
        suffix={
          fields.confirm.length > 0 ? (
            passwordMatch ? (
              <MatchOkIcon />
            ) : (
              <MatchErrIcon />
            )
          ) : null
        }
      >
        <input
          className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[13px] placeholder-gray-700"
          type="password"
          placeholder="Re-enter password"
          value={fields.confirm}
          onChange={(e) => set("confirm", e.target.value)}
          onFocus={() => setFocused("confirm")}
          onBlur={() => setFocused(null)}
        />
      </Field>

      {passwordMismatch && (
        <p className="font-mono text-[10px] text-red-400 -mt-2">
          Passwords don't match.
        </p>
      )}

      <SubmitBtn
        label="Create Account"
        loading={loading}
        done={done}
        onClick={handleSubmit}
      />

      <p className="text-center font-mono text-[11px] text-gray-600 mt-1">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#b5f542] hover:underline cursor-pointer bg-transparent border-none p-0 font-mono text-[11px]"
        >
          Sign in →
        </button>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Root Auth Component  ← default export
───────────────────────────────────────── */
export default function Auth() {
  const [mode, setMode] = useState("signin");
  const [animating, setAnimating] = useState(false);

  const switchMode = useCallback(
    (next) => {
      if (next === mode || animating) return;
      setAnimating(true);
      setTimeout(() => {
        setMode(next);
        setAnimating(false);
      }, 220);
    },
    [mode, animating],
  );

  const decoWidths = [100, 72, 88, 45, 60];

  return (
    <div className="min-h-screen w-full bg-[#0c0d10] flex relative overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute top-[-10%] left-[30%] w-[500px] h-[340px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(181,245,66,0.07), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[20%] w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(181,245,66,0.04), transparent 70%)",
        }}
      />

      {/* ── Left Brand Panel ── */}
      <div className="hidden md:flex w-[260px] shrink-0 bg-[#0e0f12] border-r border-[#1a1c22] p-10 flex-col justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#b5f542] block mb-2">
            WORKSPACE
          </span>
          <h1 className="text-[52px] font-extrabold text-gray-200 leading-none mb-4">
            Task<span className="text-[#b5f542]">s</span>
          </h1>
          <p className="font-mono text-xs text-gray-700 leading-relaxed">
            Plan it. Track it.
            <br />
            Ship it.
          </p>
        </div>

        {/* Decorative progress bars */}
        <div className="flex flex-col gap-2.5">
          {decoWidths.map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="h-[3px] rounded-full opacity-40"
                style={{
                  width: `${Math.round(w * 1.1)}px`,
                  maxWidth: 120,
                  background: "linear-gradient(90deg, #b5f542, #4a7a15)",
                }}
              />
              <span className="font-mono text-[10px] text-gray-800">{w}%</span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-gray-800">
          © 2026 Workspace Inc.
        </p>
      </div>

      {/* ── Right Form Panel — fills the rest of the screen ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          {/* Tab switcher */}
          <div className="relative flex bg-[#0e0f12] border border-[#1a1c22] rounded-xl p-1 mb-8">
            <div
              className="absolute top-1 bottom-1 rounded-[9px] border border-[#252830] bg-[#1a1d24] transition-all duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                width: "calc(50% - 6px)",
                left: mode === "signin" ? "4px" : "calc(50% + 2px)",
              }}
            />
            {[
              { key: "signin", label: "Sign In" },
              { key: "signup", label: "Sign Up" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={[
                  "relative z-10 flex-1 py-2.5 text-[13px] font-bold tracking-wide",
                  "transition-colors duration-200 bg-transparent border-none cursor-pointer",
                  mode === key ? "text-gray-100" : "text-gray-600",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Animated form swap */}
          <div
            className="transition-all duration-[220ms] ease-out"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
            }}
          >
            {mode === "signin" ? (
              <SignInForm onSwitch={() => switchMode("signup")} />
            ) : (
              <SignUpForm onSwitch={() => switchMode("signin")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
