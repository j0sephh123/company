import { useQuery } from "@tanstack/react-query";
import {
  getInitialEmployees,
  getInitialProjects,
  getInitialAssignments,
} from "../utils";
import { Employee, Project, Assignment } from "../types";

export function useEmployees() {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () => getInitialEmployees(),
    staleTime: 5000, // Add staleTime to prevent frequent refetches
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => getInitialProjects(),
    staleTime: 5000,
  });
}

export function useAssignments() {
  return useQuery<Assignment[]>({
    queryKey: ["assignments"],
    queryFn: () => getInitialAssignments(),
    staleTime: 5000,
  });
}
