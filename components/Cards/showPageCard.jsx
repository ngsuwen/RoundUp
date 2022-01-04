import React from "react";
import { Container, Text, Heading } from "native-base";

export default function ShowPageCard({ heading, body }) {
  return (
    <Container width="90%" p="4" bgColor="#fff">
      <Text fontSize="sm" fontWeight="bold">
        {heading}
      </Text>
      <Text fontSize="sm" mt="1">
        {body}
      </Text>
    </Container>
  );
}
