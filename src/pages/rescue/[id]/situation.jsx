import { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AlertTriangle, ChevronRight, ArrowRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import servicesData from "@/data/services.json";
import Image from "next/image";
import ServiceIcon from "@/components/common/ServiceIcon";

function evaluateRule(rule, answers) {
  return rule.conditions.every(
    (cond) => answers[cond.questionId] === cond.value
  );
}

function getServiceConfig(serviceId) {
  const { services } = servicesData;
  return (
    services.find((service) => service.id === serviceId) || services[0]
  );
}

export default function SituationPage() {
  const router = useRouter();
  const { id, service: serviceFromQuery } = router.query;

  const serviceId =
    typeof serviceFromQuery === "string" && serviceFromQuery.length > 0
      ? serviceFromQuery
      : "flat-tire";

  const serviceConfig = getServiceConfig(serviceId);
  const situation = serviceConfig.situation;
  const notAvailableConfig = situation.serviceNotAvailable;

  const [answers, setAnswers] = useState({});
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  const [matchedRule, setMatchedRule] = useState(null);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const shouldShowQuestion = (question) => {
    if (!question.dependsOn) return true;
    const current = answers[question.dependsOn.questionId];
    return current === question.dependsOn.value;
  };

  const isStepComplete = useMemo(() => {
    return situation.questions.filter(shouldShowQuestion).every((q) => {
      const value = answers[q.id];
      if (q.type === "yes_no" || !q.type) {
        return value === "yes" || value === "no";
      }
      // for single_choice or other types, any non-empty value counts
      return value !== undefined && String(value).trim().length > 0;
    });
  }, [answers, situation.questions]);

  const handleContinue = () => {
    // Check for service not available rules first (if any)
    const rules = situation.rules || [];
    const rule = rules.find((r) => evaluateRule(r, answers));

    if (rule && notAvailableConfig) {
      setMatchedRule(rule);
      setShowNotAvailable(true);
      return;
    }

    // Persist situation answers so they can be sent with the final API request
    if (typeof window !== "undefined" && id) {
      try {
        window.localStorage.setItem(
          `curbsidesos_rescue_${id}_situation`,
          JSON.stringify({
            serviceId: serviceConfig.id,
            answers,
          })
        );
      } catch (e) {
        console.error("Failed to persist situation data", e);
      }
    }

    // Otherwise continue to vehicle step for current service
    router.push(`/rescue/${id}/vehicle?service=${serviceConfig.id}`);
  };

  const handleContinueBasicTow = () => {
    setShowNotAvailable(false);
    if (!notAvailableConfig) {
      if (typeof window !== "undefined" && id) {
        try {
          window.localStorage.setItem(
            `curbsidesos_rescue_${id}_situation`,
            JSON.stringify({
              serviceId: serviceConfig.id,
              answers,
            })
          );
        } catch (e) {
          console.error("Failed to persist situation data", e);
        }
      }
      router.push(`/rescue/${id}/vehicle?service=${serviceConfig.id}`);
      return;
    }

    const targetServiceId = notAvailableConfig.toServiceId || serviceConfig.id;
    if (typeof window !== "undefined" && id) {
      try {
        window.localStorage.setItem(
          `curbsidesos_rescue_${id}_situation`,
          JSON.stringify({
            serviceId: targetServiceId,
            answers,
          })
        );
      } catch (e) {
        console.error("Failed to persist situation data", e);
      }
    }
    router.push(`/rescue/${id}/vehicle?service=${targetServiceId}`);
  };

  return (
    <>
      <Head>
        <title>Describe the situation | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"  />
        <main>
          <Container className="pb-10 pt-4">
            <div className="mx-auto max-w-full">
              {/* Step indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wide">
                  {/* Step 1 */}
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                        1
                      </div>
                      <div className="ml-2 flex-1 h-[2px] bg-gray-200" />
                  {/* Step 2 */}
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-500">
                        2
                      </div>
                      <div className="ml-2 flex-1 h-[2px] bg-gray-200" />
                  {/* Step 3 */}
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-500">
                        3
                      </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {situation.title}
                  </h1>
                  <p className="mt-2 text-gray-600">{situation.description}</p>
                </div>
                {serviceConfig && (
                  <div className="hidden items-center gap-2 sm:flex sm:flex-col sm:items-center">
                    <ServiceIcon
                      src={serviceConfig.icon}
                      alt={serviceConfig.name}
                      size="sm"
                      isBorder={false}
                      className="bg-primary/10"
                    />
                    {/* <span className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {serviceConfig.name}
                    </span> */}
                  </div>
                )}
              </div>

              <div className="mt-6">
                {situation.questions.map((question) => {
                  const visible = shouldShowQuestion(question);

                  return (
                    <div
                      key={question.id}
                      className={`space-y-2 overflow-hidden transition-all duration-700 ${
                        visible
                          ? "mt-6 max-h-96 opacity-100"
                          : "mt-0 max-h-0 opacity-0"
                      }`}
                    >
                      <p className="font-medium text-gray-900">
                        {question.text}
                      </p>
                      {question.type === "single_choice" &&
                      Array.isArray(question.options) ? (
                        <div className="flex flex-col gap-6">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="inline-flex items-center gap-2 text-gray-800"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={() =>
                                  handleAnswer(question.id, option)
                                }
                                className="h-4 w-4 accent-primary"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-6">
                          <label className="inline-flex items-center gap-2 text-gray-800">
                            <input
                              type="radio"
                              name={question.id}
                              value="yes"
                              checked={answers[question.id] === "yes"}
                              onChange={() => handleAnswer(question.id, "yes")}
                              className="h-4 w-4 accent-primary"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="inline-flex items-center gap-2 text-gray-800">
                            <input
                              type="radio"
                              name={question.id}
                              value="no"
                              checked={answers[question.id] === "no"}
                              onChange={() => handleAnswer(question.id, "no")}
                              className="h-4 w-4 accent-primary"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!isStepComplete}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                    isStepComplete
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  Continue
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline"
                >
                  Go back
                </button>
              </div>
            </div>
          </Container>
        </main>

        {showNotAvailable && notAvailableConfig && (
          <>
            <div className="fixed inset-0 z-60 bg-black/40" />
            <div className="fixed inset-0 z-70 flex items-center justify-center px-4">
              <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    {notAvailableConfig.title}
                  </h2>
                </div>
                <div className="mb-4 flex items-center justify-start gap-4">
                  <ServiceIcon
                    src={serviceConfig.icon}
                    alt={serviceConfig.name}
                    size="sm"
                    className="border-gray-200"
                  />
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  {notAvailableConfig.toServiceId && (
                    <ServiceIcon
                      src={
                        getServiceConfig(notAvailableConfig.toServiceId).icon
                      }
                      alt={getServiceConfig(notAvailableConfig.toServiceId).name}
                      size="sm"
                      className="border-gray-200"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-700">
                  {notAvailableConfig.messageIntro}
                </p>
                {notAvailableConfig.messageWarning && (
                  <p className="mt-3 text-sm text-gray-700">
                    {notAvailableConfig.messageWarning}
                  </p>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={handleContinueBasicTow}
                    className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
                  >
                    {notAvailableConfig.buttonLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNotAvailable(false)}
                    className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

