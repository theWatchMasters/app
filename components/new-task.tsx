import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { API_BASE_URL } from '@/constants';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import * as React from 'react';
import { Controller, FieldErrors, Form, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSession } from './auth/SessionContext';
import PaymentStub from './payment-stub';
const MAX_AMOUNT = 100;
const LENGTH_OPTIONS = ["15m", "30m", "1h", "2h", "4h", "8h", "12h", "1d", "2d", "3d"];

interface INewTaskType {
    title: string | null;
    length: string;
    amount: number;
}

interface IErrorResponse {
    success: false;
    error: string;
}

interface ISuccessResponse {
    success: true;
    paymentToken: string;
}

export function NewTaskForm() {
    const { t } = useTranslation();
    const session = useSession();
    const [paymentOpen, setPaymentOpen] = React.useState(false);

    const { control, handleSubmit } = useForm<INewTaskType>({
        defaultValues: {
            title: null,
            length: LENGTH_OPTIONS[0],
            amount: 0,
        },
    });

    const onError = async ({
        response,
        error,
    }:
        | {
            response: Response;
            error?: undefined;
        }
        | {
            response?: undefined;
            error: unknown;
        }) => {
        let errorText: string;
        if (error instanceof TypeError)
            errorText = t('vault_new.errors.network_failure');
        else if (response instanceof Response && response !== null)
            try {
                errorText = t(((await response.json()) as IErrorResponse).error);
            } catch (e) {
                errorText = t('error.generic');
            }
        else errorText = t('error.generic');
        Toast.show({
            type: 'error',
            swipeable: true,
            autoHide: true,
            text1: t('vault_new.errors.heading'),
            text2: errorText,
        });
    };

    const onValidationError = (errors: FieldErrors<IErrorResponse>) => {
        for (let i of Object.keys(errors) as (keyof typeof errors)[]) {
            Toast.show({
                type: 'error',
                swipeable: true,
                autoHide: true,
                text1: t('vault_new.errors.heading'),
                text2: t('vault_new.errors.' + i + '-' + errors[i]?.type),
            });
        }
    };

    React.useEffect(() => {
        if (!session.session.signed_in) {
            router.replace('/login');
        }
    }, [session]);

    const onSuccess = async ({ response }: { response: Response }) => {
        setPaymentOpen(true);
    }
    
    return (
        <Form
            className="gap-6"
            control={control}
            action={API_BASE_URL + 'vault/new'}
            method="post"
            encType="application/json"
            onSuccess={onSuccess}
            onError={onError}
            render={({ submit }) => (
                <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-xl sm:text-left">
                            {t('vault_new.headings.text1')}
                        </CardTitle>
                        <CardDescription className="text-center sm:text-left">
                            {t('vault_new.headings.text2')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="gap-6">
                        <View className="gap-6">
                            <Controller
                                control={control}
                                rules={{
                                    required: false,
                                    maxLength: 320,
                                    deps: 'title',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="title">{t('vault_new.headings.title')}</Label>
                                        <Input
                                            id="title"
                                            returnKeyType="next"
                                            submitBehavior="submit"
                                            placeholder={t('vault_new.placeholders.title')}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value || ""}
                                        />
                                    </View>
                                )}
                                name="title"
                            />
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    min: 0,
                                    max: MAX_AMOUNT,
                                    deps: 'amount',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="amount">{t('vault_new.headings.amount')}</Label>
                                        <Slider
                                            id="amount"
                                            minimumValue={0}
                                            maximumValue={MAX_AMOUNT}
                                            step={0.1}
                                            onBlur={onBlur}
                                            onValueChange={onChange}
                                            value={value}
                                        />
                                        <Text className="text-sm text-muted-foreground">
                                            {value.toFixed(2)}
                                        </Text>
                                    </View>
                                )}
                                name="amount"
                            />
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    deps: 'length'
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="amount">{t('vault_new.headings.length')}</Label>
                                        <Slider
                                            id="amount"
                                            minimumValue={0}
                                            maximumValue={LENGTH_OPTIONS.length - 1}
                                            step={1}
                                            onBlur={onBlur}
                                            onValueChange={index => onChange(LENGTH_OPTIONS[index])}
                                            value={LENGTH_OPTIONS.indexOf(value) === -1 ? 0 : LENGTH_OPTIONS.indexOf(value)}
                                        />
                                        <Text className="text-sm text-muted-foreground">
                                            {value}
                                        </Text>
                                    </View>
                                )}
                                name="length"
                            />
                            <Button
                                className="w-full"
                                onPress={handleSubmit(() => submit(), onValidationError)}
                            >
                                <Text>{t('vault_new.continue')}</Text>
                            </Button>
                        </View>
                        <PaymentStub open={paymentOpen} setOpen={setPaymentOpen} />
                    </CardContent>
                </Card>
            )}
        />
    );
}
