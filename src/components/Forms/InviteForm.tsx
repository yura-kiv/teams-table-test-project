import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { User } from "../../models/user.models";
import { TeamMember } from "../../models/team.models";
import styles from "./TeamForm.module.scss";

interface InviteFormProps {
  onSubmit: (selectedMembers: string[]) => void;
  allUsers: User[];
  teamMembers: TeamMember[];
}

const InviteFormSchema = Yup.object().shape({
  selectedMembers: Yup.array()
    .of(Yup.string())
    .min(1, "Add at least one member")
    .required("Select at least one member"),
});

const InviteForm: React.FC<InviteFormProps> = ({ onSubmit, allUsers, teamMembers }) => {
  const initialValues: { selectedMembers: string[] } = {
    selectedMembers: [],
  };

  const handleSubmit = (values: { selectedMembers: string[] }) => {
    onSubmit(values.selectedMembers);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={InviteFormSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formWrapper}>
            <label
              className={styles.label}
              htmlFor="selectedMembers"
            >
              Select Team Members:
            </label>
            <div className={styles.memberList}>
              <FieldArray name="selectedMembers">
                {() => (
                  <div>
                    {allUsers
                      .filter((user) => !teamMembers.some((member) => member.userId === user.id))
                      .map((user) => (
                        <div
                          key={user.id}
                          className={styles.memberItem}
                        >
                          <Field
                            type="checkbox"
                            name={`selectedMembers`}
                            value={user.id}
                          />
                          <label htmlFor={`selectedMembers.${user.id}.userId`}>{user.name}</label>
                        </div>
                      ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <ErrorMessage
              name="selectedMembers"
              component="div"
              className={styles.error}
            />
            <button
              type="submit"
              className={styles.submit}
            >
              Add members
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InviteForm;
