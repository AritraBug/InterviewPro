package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.InterviewRequestDto;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.entity.Interview;
import com.aritra.interviewpro.exception.CandidateNotFoundException;
import com.aritra.interviewpro.repository.CandidateRepository;
import com.aritra.interviewpro.repository.InterviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.aritra.interviewpro.dto.InterviewStatusUpdateDto;
import com.aritra.interviewpro.enums.InterviewStatus;
import com.aritra.interviewpro.exception.InvalidStatusTransitionException;
@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final CandidateRepository candidateRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            CandidateRepository candidateRepository
    ) {
        this.interviewRepository = interviewRepository;
        this.candidateRepository = candidateRepository;
    }
    public List<InterviewResponseDto> getAllInterviews() {

        return interviewRepository.findAll()
                .stream()
                .map(interview ->
                        InterviewResponseDto.builder()
                                .id(interview.getId())
                                .title(interview.getTitle())
                                .interviewer(interview.getInterviewer())
                                .scheduledAt(interview.getScheduledAt())
                                .status(interview.getStatus())
                                .mode(interview.getMode())
                                .meetingLink(interview.getMeetingLink())
                                .location(interview.getLocation())
                                .notes(interview.getNotes())
                                .candidateId(
                                        interview.getCandidate().getId()
                                )
                                .build()
                )
                .collect(Collectors.toList());
    }
    public InterviewResponseDto scheduleInterview(
            InterviewRequestDto requestDto
    ) {

        Candidate candidate = candidateRepository
                .findById(requestDto.getCandidateId())
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        Interview interview = new Interview();

        interview.setTitle(requestDto.getTitle());
        interview.setInterviewer(requestDto.getInterviewer());
        interview.setScheduledAt(requestDto.getScheduledAt());
        interview.setStatus(requestDto.getStatus());
        interview.setMode(requestDto.getMode());
        interview.setMeetingLink(requestDto.getMeetingLink());
        interview.setLocation(requestDto.getLocation());
        interview.setNotes(requestDto.getNotes());

        interview.setCandidate(candidate);

        Interview savedInterview =
                interviewRepository.save(interview);

        return InterviewResponseDto.builder()
                .id(savedInterview.getId())
                .title(savedInterview.getTitle())
                .interviewer(savedInterview.getInterviewer())
                .scheduledAt(savedInterview.getScheduledAt())
                .status(savedInterview.getStatus())
                .mode(savedInterview.getMode())
                .meetingLink(savedInterview.getMeetingLink())
                .location(savedInterview.getLocation())
                .notes(savedInterview.getNotes())
                .candidateId(
                        savedInterview.getCandidate().getId()
                )
                .build();
    }
    public List<InterviewResponseDto> getInterviewsByCandidateId(
            Long candidateId
    ) {

        candidateRepository.findById(candidateId)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        return interviewRepository
                .findByCandidateId(candidateId)
                .stream()
                .map(interview ->
                        InterviewResponseDto.builder()
                                .id(interview.getId())
                                .title(interview.getTitle())
                                .interviewer(interview.getInterviewer())
                                .scheduledAt(interview.getScheduledAt())
                                .status(interview.getStatus())
                                .mode(interview.getMode())
                                .meetingLink(interview.getMeetingLink())
                                .location(interview.getLocation())
                                .notes(interview.getNotes())
                                .candidateId(
                                        interview.getCandidate().getId()
                                )
                                .build()
                )
                .toList();
    }
    public InterviewResponseDto updateInterviewStatus(
            Long interviewId,
            InterviewStatusUpdateDto requestDto
    ) {

        Interview interview = interviewRepository
                .findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interview not found"));

        InterviewStatus currentStatus =
                interview.getStatus();

        InterviewStatus newStatus =
                requestDto.getStatus();

        validateStatusTransition(
                currentStatus,
                newStatus
        );

        interview.setStatus(newStatus);

        Interview savedInterview =
                interviewRepository.save(interview);

        return InterviewResponseDto.builder()
                .id(savedInterview.getId())
                .title(savedInterview.getTitle())
                .interviewer(savedInterview.getInterviewer())
                .scheduledAt(savedInterview.getScheduledAt())
                .status(savedInterview.getStatus())
                .mode(savedInterview.getMode())
                .meetingLink(savedInterview.getMeetingLink())
                .location(savedInterview.getLocation())
                .notes(savedInterview.getNotes())
                .candidateId(
                        savedInterview.getCandidate().getId()
                )
                .build();
    }
    private void validateStatusTransition(
            InterviewStatus currentStatus,
            InterviewStatus newStatus
    ) {

        if (currentStatus ==
                InterviewStatus.SCHEDULED) {

            if (newStatus ==
                    InterviewStatus.COMPLETED
                    ||
                    newStatus ==
                            InterviewStatus.CANCELLED) {
                return;
            }
        }

        if (currentStatus ==
                InterviewStatus.COMPLETED) {

            if (newStatus ==
                    InterviewStatus.SELECTED
                    ||
                    newStatus ==
                            InterviewStatus.REJECTED) {
                return;
            }
        }

        throw new InvalidStatusTransitionException(
                "Invalid status transition from "
                        + currentStatus
                        + " to "
                        + newStatus
        );
    }
}