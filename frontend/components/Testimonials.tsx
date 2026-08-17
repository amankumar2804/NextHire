"use client";

import { useState, useEffect } from "react";
import { Star, X, Loader2, PenLine, Lock, Trash2, LogOut } from "lucide-react";

type UserTypeId = "student" | "fresher" | "professional";

interface Testimonial {
  id: string;
  userType: UserTypeId;
  name: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  color: string;
}

const ADMIN_KEY_STORAGE = "nexthire_admin_key";

const USER_TYPES: Record<
  UserTypeId,
  {
    label: string;
    roleLabel: string;
    rolePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    badgeClass: string;
  }
> = {
  student: {
    label: "Student",
    roleLabel: "Course / Branch",
    rolePlaceholder: "B.Tech CSE, 3rd Year",
    orgLabel: "College / University",
    orgPlaceholder: "IIT Delhi",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  fresher: {
    label: "Fresher",
    roleLabel: "Role / Field",
    rolePlaceholder: "Aspiring Data Analyst",
    orgLabel: "College / Company",
    orgPlaceholder: "Where you studied or work",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  professional: {
    label: "Working Professional",
    roleLabel: "Role",
    rolePlaceholder: "Product Designer",
    orgLabel: "Company",
    orgPlaceholder: "Where do you work now?",
    badgeClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  },
};

const USER_TYPE_ORDER: UserTypeId[] = ["student", "fresher", "professional"];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  isNew,
  isAdmin,
  onDelete,
}: {
  testimonial: Testimonial;
  isNew: boolean;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}) {
  const initial = testimonial.name.trim().charAt(0).toUpperCase() || "?";
  const typeMeta = USER_TYPES[testimonial.userType];

  return (
    <div
      className={`relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 ${
        isNew ? "ring-1 ring-indigo-500/50 animate-[fadeIn_0.5s_ease]" : ""
      }`}
    >
      {isAdmin && (
        <button
          onClick={() => onDelete(testimonial.id)}
          aria-label={`Delete testimonial from ${testimonial.name}`}
          className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center justify-between gap-2 pr-6">
        <StarRow rating={testimonial.rating} />
        {typeMeta && (
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${typeMeta.badgeClass}`}
          >
            {typeMeta.label}
          </span>
        )}
      </div>

      <p className="text-slate-200 text-[15px] leading-relaxed">
        &quot;{testimonial.message}&quot;
      </p>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-slate-400 text-xs truncate">
            {testimonial.role}
            {testimonial.company ? ` • ${testimonial.company}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeedbackModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (entry: {
    userType: UserTypeId;
    name: string;
    role: string;
    company: string;
    rating: number;
    message: string;
  }) => Promise<boolean>;
}) {
  const [userType, setUserType] = useState<UserTypeId>("student");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const typeMeta = USER_TYPES[userType];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!role.trim())
      e.role = `Enter your ${typeMeta.roleLabel.toLowerCase()}`;
    if (rating === 0) e.rating = "Select a rating";
    if (!message.trim() || message.trim().length < 10)
      e.message = "Share at least a short sentence (10+ characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setSubmitting(true);
    const ok = await onSubmit({
      userType,
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      rating,
      message: message.trim(),
    });
    setSubmitting(false);
    if (!ok) {
      setSubmitError("Couldn't submit your feedback. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close feedback form"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">
          Share your feedback
        </h3>
        <p className="text-slate-400 text-sm mb-5">
          Tell other job seekers what NextHire did for you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              I am a
            </label>
            <div className="flex flex-wrap gap-2">
              {USER_TYPE_ORDER.map((id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setUserType(id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    userType === id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {USER_TYPES[id].label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Rao"
                className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {typeMeta.roleLabel}
              </label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={typeMeta.rolePlaceholder}
                className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.role ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.role && (
                <p className="text-red-400 text-xs mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {typeMeta.orgLabel}{" "}
              <span className="text-slate-600">(optional)</span>
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={typeMeta.orgPlaceholder}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Rating
            </label>
            <div
              className="flex gap-1"
              onMouseLeave={() => setHoverRating(0)}
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                const filled = (hoverRating || rating) >= val;
                return (
                  <button
                    type="button"
                    key={val}
                    onMouseEnter={() => setHoverRating(val)}
                    onClick={() => setRating(val)}
                    aria-label={`Rate ${val} out of 5 stars`}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        filled
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-700"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {errors.rating && (
              <p className="text-red-400 text-xs mt-1">{errors.rating}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Your feedback
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How did NextHire help your job search?"
              rows={4}
              maxLength={400}
              className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                errors.message ? "border-red-500" : "border-slate-700"
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.message ? (
                <p className="text-red-400 text-xs">{errors.message}</p>
              ) : (
                <span />
              )}
              <p className="text-slate-600 text-xs">{message.length}/400</p>
            </div>
          </div>

          {submitError && (
            <p className="text-red-400 text-xs -mt-1">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-2.5 flex items-center justify-center gap-2 transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminLoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (key: string) => void;
}) {
  const [key, setKey] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!key.trim()) return;
    setError("");
    setVerifying(true);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "x-admin-key": key.trim() },
      });

      if (res.ok) {
        onSuccess(key.trim());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect admin key.");
      }
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-6 relative"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close admin login"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-base font-bold text-white mb-1">Admin login</h3>
        <p className="text-slate-400 text-xs mb-4">
          Enter the admin key to manage testimonials.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            autoFocus
            className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 ${
              error ? "border-red-500" : "border-slate-700"
            }`}
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={verifying}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm rounded-lg py-2 transition-colors flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Checking...
              </>
            ) : (
              "Unlock"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [newestId, setNewestId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const isAdmin = Boolean(adminKey);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (stored) setAdminKey(stored);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!cancelled) setTestimonials(data);
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = async (entry: {
    userType: UserTypeId;
    name: string;
    role: string;
    company: string;
    rating: number;
    message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error("Request failed");
      const newTestimonial: Testimonial = await res.json();

      setTestimonials((prev) => [newTestimonial, ...prev]);
      setNewestId(newTestimonial.id);
      setShowModal(false);
      setToast("Thanks — your feedback is now live below.");
      return true;
    } catch {
      return false;
    }
  };

  const handleAdminLogin = (key: string) => {
    sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    setAdminKey(key);
    setShowAdminModal(false);
    setToast("Admin mode on — you can now delete testimonials.");
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKey(null);
    setToast("Admin mode off.");
  };

  const handleDelete = async (id: string) => {
    if (!adminKey) return;
    const confirmed = window.confirm(
      "Delete this testimonial? This can't be undone."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        setAdminKey(null);
        setToast("Admin key rejected — log in again.");
        return;
      }
      if (!res.ok) throw new Error("Request failed");

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setToast("Testimonial deleted.");
    } catch {
      setToast("Couldn't delete — try again.");
    }
  };

  return (
    <section className="bg-slate-950 py-20 px-6 relative">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Admin toggle — small and out of the way in the corner */}
      <div className="absolute top-6 right-6 z-10">
        {isAdmin ? (
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 hover:bg-emerald-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Admin mode
          </button>
        ) : (
          <button
            onClick={() => setShowAdminModal(true)}
            aria-label="Admin login"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 font-semibold text-xs tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            What Our Users Say
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Thousands of professionals trust NextHire for their career
            growth.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <PenLine className="w-4 h-4" />
            Share your feedback
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-48 animate-pulse"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="text-center py-10">
            <p className="text-slate-400 text-sm mb-3">
              Couldn&apos;t load testimonials right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                isNew={t.id === newestId}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <FeedbackModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {showAdminModal && (
        <AdminLoginModal
          onClose={() => setShowAdminModal(false)}
          onSuccess={handleAdminLogin}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </section>
  );
}
