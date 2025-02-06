import { RpcException } from "@nestjs/microservices";
import { CreateTranningCatalogDto } from "src/modules/tranning_catalog/dto/create-tranning_catalog.dto";

function validateDates(start_at: Date, end_at: Date) {
  const startDate = new Date(start_at);
  const endDate = new Date(end_at);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new RpcException("Invalid start or end date format.");
  }

  if (startDate >= endDate) {
    throw new RpcException("Start date must be before the end date.");
  }
}

function validateTrainingDays(days: any[], startDate: Date, endDate: Date, duration: number) {
  if (!Array.isArray(days) || days.length === 0) return;

  const uniqueDays = new Set();
  const trainingDays = days.map(day => {
    const date = new Date(day.day);
    if (isNaN(date.getTime())) {
      throw new RpcException(`Invalid training day format: ${day.day}`);
    }
    const isoDate = date.toISOString().split('T')[0];
    if (uniqueDays.has(isoDate)) {
      throw new RpcException("Training days must not be duplicated.");
    }
    uniqueDays.add(isoDate);
    return date;
  });

  const trainingDaysInRange = trainingDays.filter(date => date >= startDate && date <= endDate);
  if (trainingDaysInRange.length !== trainingDays.length) {
    throw new RpcException("All training days must be within the start and end date range.");
  }

  if (trainingDays.length !== duration) {
    throw new RpcException(
      `Actual training days (${trainingDays.length}) do not match the registered duration (${duration}).`
    );
  }
}

export function validateTrainingCatalog(data: CreateTranningCatalogDto) {
  const { start_at, end_at, duration, days } = data;
  validateDates(start_at, end_at);
  validateTrainingDays(days, new Date(start_at), new Date(end_at), duration);
}

