import type { TFunction } from "next-i18next";

import type { WorkflowActions } from "@calcom/prisma/enums";

import { isSMSOrWhatsappAction, isWhatsappAction, isEmailToAttendeeAction } from "./actionHelperFunctions";
import {
  WHATSAPP_WORKFLOW_TEMPLATES,
  WORKFLOW_ACTIONS,
  BASIC_WORKFLOW_TEMPLATES,
  WORKFLOW_TRIGGER_EVENTS,
  ATTENDEE_WORKFLOW_TEMPLATES,
} from "./constants";

export function getWorkflowActionOptions(t: TFunction, isTeamsPlan?: boolean, isOrgsPlan?: boolean) {
  return WORKFLOW_ACTIONS.map((action) => {
    const actionString = t(`${action.toLowerCase()}_action`);

    return {
      label: actionString.charAt(0).toUpperCase() + actionString.slice(1),
      value: action,
      needsTeamsUpgrade: isSMSOrWhatsappAction(action) && !isTeamsPlan,
    };
  });
}

export function getWorkflowTriggerOptions(t: TFunction) {
  return WORKFLOW_TRIGGER_EVENTS.map((triggerEvent) => {
    const triggerString = t(`${triggerEvent.toLowerCase()}_trigger`);

    return { label: triggerString.charAt(0).toUpperCase() + triggerString.slice(1), value: triggerEvent };
  });
}

export function getWorkflowTemplateOptions(t: TFunction, action: WorkflowActions | undefined) {
  const TEMPLATES =
    action && isWhatsappAction(action)
      ? WHATSAPP_WORKFLOW_TEMPLATES
      : action && isEmailToAttendeeAction(action)
      ? ATTENDEE_WORKFLOW_TEMPLATES
      : BASIC_WORKFLOW_TEMPLATES;
  return TEMPLATES.map((template) => {
    return { label: t(`${template.toLowerCase()}`), value: template };
  }) as { label: string; value: any }[];
}
