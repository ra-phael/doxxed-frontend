import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Address: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  address: Scalars['Address']['output'];
  isContract?: Maybe<Scalars['Boolean']['output']>;
  relatedAccounts?: Maybe<Array<Scalars['Address']['output']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  getSiweNonce?: Maybe<Scalars['String']['output']>;
  verifySiwe?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationVerifySiweArgs = {
  message?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  accountByAddress?: Maybe<Account>;
};


export type QueryAccountByAddressArgs = {
  address: Scalars['Address']['input'];
};

export type GetSiweNonceMutationVariables = Exact<{ [key: string]: never; }>;


export type GetSiweNonceMutation = { __typename?: 'Mutation', getSiweNonce?: string | null };

export type VerifySiweMutationVariables = Exact<{
  message?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifySiweMutation = { __typename?: 'Mutation', verifySiwe?: boolean | null };


export const GetSiweNonceDocument = gql`
    mutation getSiweNonce {
  getSiweNonce
}
    `;

export function useGetSiweNonceMutation() {
  return Urql.useMutation<GetSiweNonceMutation, GetSiweNonceMutationVariables>(GetSiweNonceDocument);
};
export const VerifySiweDocument = gql`
    mutation VerifySiwe($message: String, $signature: String) {
  verifySiwe(message: $message, signature: $signature)
}
    `;

export function useVerifySiweMutation() {
  return Urql.useMutation<VerifySiweMutation, VerifySiweMutationVariables>(VerifySiweDocument);
};
export const namedOperations = {
  Mutation: {
    getSiweNonce: 'getSiweNonce',
    VerifySiwe: 'VerifySiwe'
  }
}