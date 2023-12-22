import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../../models/user.models";
import { CreateTeamPayload } from "../../store/slices/teams.slice";
import styles from "./TeamForm.module.scss";

interface TeamFormProps {
  onSubmit: (params: CreateTeamPayload) => void;
  users: User[];
  owner: User;
}

const TeamFormSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a team name"),
  ownerId: Yup.string().required("Select a team owner"),
  members: Yup.array()
    .of(Yup.string())
    .min(1, "Add at least one member")
    .required("Select at least one member"),
});

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit, owner, users }) => {
  const initialValues: CreateTeamPayload = {
    name: "",
    ownerId: owner.id,
    members: [],
  };

  const handleSubmit = (values: CreateTeamPayload) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TeamFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className={styles.formWrapper}>
          <div className={styles.nameWrapper}>
            <label
              className={styles.label}
              htmlFor="name"
            >
              Team Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className={styles.nameInput}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.memberListWrapper}>
            <label
              className={styles.label}
              htmlFor="members"
            >
              Team Members:
            </label>
            <div className={styles.memberList}>
              <FieldArray name="members">
                {({ push, remove }) => (
                  <>
                    {users.map((user) => (
                      <div key={user.id}>
                        <Field
                          type="checkbox"
                          id={`members.${user.id}`}
                          name={`members.${user.id}`}
                          value={user.id}
                          checked={values.members.some((member) => member === user.id)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              push(user.id);
                            } else {
                              const index = values.members.findIndex(
                                (member) => member === user.id
                              );
                              if (index !== -1) {
                                remove(index);
                              }
                            }
                          }}
                        />
                        <label htmlFor={`members.${user.id}`}>{user.name}</label>
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
            </div>
            <ErrorMessage
              name="members"
              component="div"
              className={styles.error}
            />
          </div>
          <button
            className={styles.submit}
            type="submit"
          >
            Create Team
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TeamForm;
